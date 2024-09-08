/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";

import { Request, Response } from "express";

//grabs all the guild the user is in
const getAllGuilds = async (req: Request, res: Response) => {
  //   const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

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

    res.json(allGuilds);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch all guilds" });
  }
};

const getGuild = async (req: Request, res: Response) => {
  const guildId = req.params.id;

  try {
    const guild = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        categories: {
          include: {
            channels: true,
          },
        },
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
  const { name } = req.body as { name: string };

  try {
    const newGuild = await prisma.guild.create({
      data: {
        name: name,
        ownerId: userId,
        members: {
          create: {
            userId: userId,
            role: "OWNER",
          },
        },
        categories: {
          create: {
            name: "Text Channels",
            channels: {
              create: {
                name: "general",
              },
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        categories: true,
      },
    });

    res.json(newGuild);
  } catch (error) {
    console.error("Error creating guild:", error);
    res.status(500).json({ error: "Failed to create guild" });
  }
};

export { getAllGuilds, createGuild, getGuild };
