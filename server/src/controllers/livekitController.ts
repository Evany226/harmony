import { Request, Response } from "express";
import { AccessToken } from "livekit-server-sdk";
import { roomService } from "../lib/livekit";

const createToken = async ({
  roomName,
  participantName,
}: {
  roomName: string;
  participantName: string;
}) => {
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
    const test = await createToken({ roomName, participantName });

    res.json(test);
  } catch (error) {
    console.log(error);
  }
};

const checkRoomEmpty = async (req: Request, res: Response) => {
  const { roomName } = req.body as { roomName: string };

  try {
    const rooms = await roomService.listRooms();
    const room = rooms.find((room) => room.name === roomName);

    if (!room) {
      res.json({ empty: true });
      return;
    }

    const result = await roomService.listParticipants(roomName);

    if (result.length === 0) {
      res.json({ empty: true });
    } else {
      res.json({ empty: false });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error checking room:", error);
    res.status(500).json({ error: "Error checking room" });
  }
};

export { getLivekitToken, checkRoomEmpty };
