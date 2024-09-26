/* eslint-disable @typescript-eslint/no-namespace */
import prisma from "../lib/prisma";
import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getChannel = async (req: Request, res: Response) => {
  const { channelId } = req.params;

  try {
    const channel = await prisma.textChannel.findUnique({
      where: {
        id: channelId,
      },
    });

    res.json(channel);
  } catch (error) {
    console.error("Error fetching channel:", error);
    res.status(500).json({ error: "Failed to fetch channel" + error });
  }
};

const createChannel = async (req: Request, res: Response) => {
  const { categoryId, name } = req.body as { categoryId: string; name: string };

  try {
    const newChannel = await prisma.textChannel.create({
      data: {
        categoryId: categoryId,
        name: name,
      },
    });

    res.json(newChannel);
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ error: "Failed to create channel" + error });
  }
};

const updateChannel = async (req: Request, res: Response) => {
  const { channelId } = req.params;
  const { name, topic } = req.body as { name: string; topic?: string };

  try {
    const updatedChannel = await prisma.textChannel.update({
      where: {
        id: channelId,
      },
      data: {
        name: name,
        topic: topic,
      },
    });

    res.json(updatedChannel);
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({ error: "Failed to update channel" + error });
  }
};

const deleteChannel = async (req: Request, res: Response) => {
  const { channelId } = req.params;

  try {
    const deletedChannel = await prisma.textChannel.delete({
      where: {
        id: channelId,
      },
    });

    res.json(deletedChannel);
  } catch (error) {
    console.error("Error deleting channel:", error);
    res.status(500).json({ error: "Failed to delete channel" + error });
  }
};

const getFirstChannel = async (req: Request, res: Response) => {
  const { guildId } = req.params;

  try {
    const firstCategory = await prisma.category.findFirst({
      where: {
        guildId: guildId,
      },
      include: {
        channels: true,
      },
    });

    if (firstCategory?.channels[0]?.id) {
      res.json(`/guilds/${guildId}/${firstCategory?.channels[0]?.id}`);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.error("Error fetching first channel:", error);
    res.status(500).json({ error: "Failed to fetch first channel" + error });
  }
};

const getUserChannelIds = async (req: Request, res: Response) => {
  // const userId = req.auth.userId;
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

export {
  getChannel,
  createChannel,
  deleteChannel,
  getFirstChannel,
  updateChannel,
  getUserChannelIds,
};
