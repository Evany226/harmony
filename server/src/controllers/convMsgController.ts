/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";
import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

//grabs all messages for a specific conversation
const getAllMessages = async (req: Request, res: Response) => {
  const conversationId = req.params.id;

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      select: {
        id: true,
        content: true,
        edited: true,
        createdAt: true,
        isAlert: true,
        sender: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const createMessage = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";
  const { content, conversationId } = req.body as {
    content: string;
    conversationId: string;
  };

  try {
    const participant = await prisma.participant.findUnique({
      where: {
        userId_conversationId: {
          userId: userId,
          conversationId: conversationId,
        },
      },
    });

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    const newMessage = await prisma.message.create({
      data: {
        content: content,
        senderId: participant.id,
        conversationId: conversationId,
      },
      include: {
        sender: {
          include: {
            user: true,
          },
        },
      },
    });

    // await prisma.participant.update({
    //   where: {
    //     userId_conversationId: {
    //       userId: userId,
    //       conversationId: conversationId,
    //     },
    //   },
    //   data: {
    //     lastViewed: new Date(),
    //   },
    // });

    res.json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
};

const editMessage = async (req: Request, res: Response) => {
  const { content, messageId } = req.body as {
    content: string;
    messageId: string;
  };

  try {
    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        content: content,
        edited: true,
      },
    });

    res.json(updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Failed to update message" });
  }
};

export { getAllMessages, createMessage, editMessage };
