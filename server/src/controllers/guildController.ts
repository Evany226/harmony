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
      orderBy: {
        createdAt: "desc",
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
          orderBy: {
            createdAt: "asc",
          },
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
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";
  const { name } = req.body as { name: string };

  if (!name) {
    return res.status(400).json({ error: "Guild name is required" });
  }

  const file = req.file as Express.MulterS3.File;

  if (!file) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (file.mimetype.split("/")[0] !== "image") {
    return res
      .status(400)
      .json({ error: "Invalid image type. Valid types are: png, jpg, jpeg" });
  }

  try {
    const newGuild = await prisma.guild.create({
      data: {
        name: name,
        imageUrl: file.location,
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

const leaveGuild = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  const { guildId } = req.params as { guildId: string };

  try {
    const isOwner = await prisma.member.findFirst({
      where: {
        userId: userId,
        guildId: guildId,
        role: "OWNER",
      },
    });

    if (isOwner) {
      return res.status(403).json({
        error: "You cannot leave a guild you own. You'd have to delete it.",
      });
    }

    await prisma.member.deleteMany({
      where: {
        userId: userId,
        guildId: guildId,
        role: {
          not: "OWNER",
        },
      },
    });

    res.json({ message: "Successfully left guild" });
  } catch (error) {
    console.error("Error leaving guild:", error);
    res.status(500).json({ error: "Failed to leave guild" });
  }
};

const deleteGuild = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2l6xqjXoVzoqWB4Lm3w2iwCezWB";
  const { guildId } = req.params as { guildId: string };

  const isOwner = await prisma.member.findFirst({
    where: {
      userId: userId,
      guildId: guildId,
      role: "OWNER",
    },
  });

  if (!isOwner) {
    return res
      .status(403)
      .json({ error: "You are not the owner of this guild" });
  }

  try {
    const deletedGuild = await prisma.guild.delete({
      where: {
        id: guildId,
        ownerId: userId,
      },
    });

    res.json(deletedGuild);
  } catch (error) {
    console.error("Error deleting guild:", error);
    res.status(500).json({ error: "Failed to delete guild" });
  }
};

const updateGuild = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";
  const { guildId } = req.body as { guildId: string };
  const { name } = req.body as { name: string };

  console.log(req.body);

  const isOwnerAdmin = await prisma.member.findFirst({
    where: {
      userId: userId,
      guildId: guildId,
      OR: [
        {
          role: "OWNER",
        },
        {
          role: "ADMIN",
        },
      ],
    },
  });

  console.log("test");

  console.log(isOwnerAdmin);

  if (!isOwnerAdmin) {
    return res
      .status(403)
      .json({ error: "You are not the owner or an admin of this guild" });
  }

  if (!name) {
    return res.status(400).json({ error: "Guild name is required" });
  }

  const file = req.file as Express.MulterS3.File;

  console.log(file);

  //if there is an image uploaded
  if (file.originalname !== "undefined") {
    if (file.mimetype.split("/")[0] !== "image") {
      return res
        .status(400)
        .json({ error: "Invalid image type. Valid types are: png, jpg, jpeg" });
    }

    try {
      const updatedGuild = await prisma.guild.update({
        where: {
          id: guildId,
        },
        data: {
          name: name,
          imageUrl: file.location,
        },
      });

      res.json(updatedGuild);
    } catch (error) {
      console.error("Error updating guild:", error);
      res.status(500).json({ error: "Failed to update guild" });
    }
  } else {
    try {
      const updatedGuild = await prisma.guild.update({
        where: {
          id: guildId,
        },
        data: {
          name: name,
        },
      });

      res.json(updatedGuild);
    } catch (error) {
      console.error("Error updating guild:", error);
      res.status(500).json({ error: "Failed to update guild" });
    }
  }
};

export {
  getAllGuilds,
  createGuild,
  getGuild,
  leaveGuild,
  deleteGuild,
  updateGuild,
};
