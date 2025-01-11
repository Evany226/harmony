/* eslint-disable @typescript-eslint/no-namespace */
import prisma from "../lib/prisma";
import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getAllChannelMessages = async (req: Request, res: Response) => {
  const { channelId } = req.params;

  try {
    const channelMessages = await prisma.channelMessages.findMany({
      where: {
        channelId: channelId,
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
    });

    res.json(channelMessages);
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    res.status(500).json({ error: "Failed to fetch channel messages" });
  }
};

const createChannelMessage = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  const { channelId, messageContent, guildId } = req.body as {
    channelId: string;
    guildId: string;
    messageContent: string;
  };

  try {
    const member = await prisma.member.findUnique({
      where: {
        userId_guildId: {
          userId: userId,
          guildId: guildId,
        },
      },
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const newMessage = await prisma.channelMessages.create({
      data: {
        content: messageContent,
        senderId: member.id,
        channelId: channelId,
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
    });

    res.json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" + error });
  }
};

const editChannelMessage = async (req: Request, res: Response) => {
  const { messageId, messageContent } = req.body as {
    messageId: string;
    messageContent: string;
  };

  try {
    const updatedMessage = await prisma.channelMessages.update({
      where: {
        id: messageId,
      },
      data: {
        content: messageContent,
        edited: true,
      },
    });

    res.json(updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Failed to update message" });
  }
};

export { createChannelMessage, getAllChannelMessages, editChannelMessage };
