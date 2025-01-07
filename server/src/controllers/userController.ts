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
    const allGuilds = await prisma.guild.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        categories: {
          include: {
            channels: true,
          },
        },
      },
    });

    const channelIds = allGuilds.map((guild) => {
      return guild.categories.map((category) => {
        return category.channels.map((channel) => {
          return channel.id;
        });
      });
    });

    res.json(channelIds.flat(2));
  } catch (error) {
    console.error("Error fetching user channels:", error);
    res.status(500).json({ error: "Failed to fetch user channels" + error });
  }
};

export { getUserGuildIds, getUserChannelIds };
