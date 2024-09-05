/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";

import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

//grabs all the guild the user is in
const getAllGuilds = async (req: Request, res: Response) => {
  //   const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const allGuilds = await prisma.guild.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });

    res.json(allGuilds);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch all guilds" });
  }
};

const getGuild = async (req: Request, res: Response) => {
  const guildId = req.params.guildId;

  try {
    const guild = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
    });

    res.json(guild);
  } catch (error) {
    console.error("Error fetching guild:", error);
    res.status(500).json({ error: "Failed to fetch guild" });
  }
};

const createGuild = async (req: Request, res: Response) => {
  //   const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const newGuild = await prisma.guild.create({
      data: {
        name: "Test Guild",
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.json(newGuild);
  } catch (error) {
    console.error("Error creating guild:", error);
    res.status(500).json({ error: "Failed to create guild" });
  }
};

export { getAllGuilds, createGuild, getGuild };
