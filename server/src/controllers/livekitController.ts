import { Request, Response } from "express";
import { AccessToken } from "livekit-server-sdk";
import { roomService } from "../lib/livekit";
import prisma from "../lib/prisma";

const createToken = async (roomName: string, participantName: string) => {
  // If this room doesn't exist, it'll be automatically created when the first
  // client joins
  // Identifier to be used for participant.
  // It's available as LocalParticipant.identity with livekit-client SDK

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      // Token to expire after 10 minutes
      ttl: 600,
    }
  );
  at.addGrant({ roomJoin: true, room: roomName });

  // eslint-disable-next-line @typescript-eslint/await-thenable
  return await at.toJwt();
};

const getLivekitToken = async (req: Request, res: Response) => {
  try {
    const { roomName, participantName } = req.body as {
      roomName: string;
      participantName: string;
    };
    const test = await createToken(roomName, participantName);

    res.json(test);
  } catch (error) {
    console.log(error);
  }
};

const checkUserInRoom = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.userId;

    const { participantName } = req.body as { participantName: string };

    const guilds = await prisma.guild.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        categories: {
          select: {
            channels: {
              where: {
                isVoice: true,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const channelIds = guilds.map((guild) => {
      const result = guild.categories.map((category) => {
        return category.channels.map((channel) => channel.id);
      });

      const ids = result.flat();

      return ids;
    });

    const channelIdArr = channelIds.flat();

    const roomList = await roomService.listRooms();

    const results = channelIdArr.map(async (channelId) => {
      const room = roomList.find((room) => room.name === channelId);

      if (!room) {
        return false;
      }

      const result = await roomService.listParticipants(channelId);

      const isUserInRoom = result.some((p) => p.identity === participantName);

      return isUserInRoom;
    });

    const finalResults = await Promise.all(results);

    res.json(finalResults.some((result) => result));
  } catch (error) {
    console.log("Error checking user in room:", error);
    res.json(false);
  }
};

const getActiveVoiceChannels = async (req: Request, res: Response) => {
  const { guildId } = req.params;

  const roomNames = await prisma.guild.findUnique({
    where: { id: guildId },
    select: {
      categories: {
        select: {
          channels: {
            where: {
              isVoice: true,
            },
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  console.log(roomNames);

  if (!roomNames) {
    res.status(404).json({ error: "Guild not found" });
    return;
  }

  console.log("Room names found", roomNames);

  const result = roomNames.categories.map((category) => {
    return category.channels.map((channel) => channel.id);
  });

  console.log("Result", result);

  const channelIds = result.flat();

  const roomList = await roomService.listRooms();

  console.log("Room list", roomList);

  const results = await Promise.all(
    channelIds.map(async (channelId) => {
      const room = roomList.find((room) => room.name === channelId);

      if (!room) {
        return { channelId, participants: [] };
      }

      try {
        const participants = await roomService.listParticipants(channelId);

        console.log("Participants", participants);

        const newParticipants = participants.map((p) => {
          const tracks = p.tracks;
          let isMuted = true;

          if (!tracks) {
            return {
              username: p.identity,
              isMuted: true,
            };
          }

          tracks.some((track) => {
            if (JSON.stringify(track.source) === "2") {
              if (track.muted === false) {
                isMuted = false;
                return true;
              }
            }
            return false;
          });

          return {
            username: p.identity,
            isMuted: isMuted,
          };
        });
        return { channelId, participants: newParticipants };
      } catch (error) {
        console.error(
          `Error fetching participants for channel ${channelId}:`,
          error
        );
        return { channelId, participants: [] }; // Return empty participants on error
      }
    })
  );

  console.log(results);

  return res.json(results);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // const result = await roomService.listParticipants(roomName);
  // res.json(result.map((p) => p.identity));
};

export { getLivekitToken, getActiveVoiceChannels, checkUserInRoom };
