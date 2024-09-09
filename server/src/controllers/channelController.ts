import prisma from "../lib/prisma";
import { Request, Response } from "express";

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
