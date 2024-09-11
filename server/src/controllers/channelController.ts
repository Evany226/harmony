import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const getChannel = async (req: Request, res: Response) => {
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

export const createChannel = async (req: Request, res: Response) => {
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
