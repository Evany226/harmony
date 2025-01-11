/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";

import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getUserGuildIds = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const allGuildIds = await prisma.guild.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const guildIdArr = allGuildIds.map((guild) => guild.id);

    res.json(guildIdArr);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch all guilds" });
  }
};

const getUserChannelIds = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    // Fetching only necessary data (guilds and their channels)
    const allGuilds = await prisma.guild.findMany({
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
              select: {
                id: true, // Only selecting the channel ID
              },
            },
          },
        },
      },
    });

    // Flattening and extracting channel IDs in a single step
    const channelIds = allGuilds.flatMap((guild) =>
      guild.categories.flatMap((category) =>
        category.channels.map((channel) => channel.id)
      )
    );

    res.json(channelIds);
  } catch (error) {
    console.error("Error fetching user channels:", error);
    res.status(500).json({ error: "Failed to fetch user channels" });
  }
};

export { getUserGuildIds, getUserChannelIds };
