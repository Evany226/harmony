import prisma from "../lib/prisma";
import { Request, Response } from "express";

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

export {
  getChannel,
  createChannel,
  deleteChannel,
  getFirstChannel,
  updateChannel,
};
