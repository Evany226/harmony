/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";
import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getAllConversations = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const allConversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        participants: {
          where: {
            userId: {
              not: userId,
            },
          },
          include: {
            user: true,
          },
        },
      },
    });

    res.json(allConversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

//fetches one conversation
const getConversation = async (req: Request, res: Response) => {
  const conversationId = req.params.id;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    res.json(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
};

//used when users click the direct messages + button to setup empty conversation
const createConversation = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";
  const { otherUserIds } = req.body as { otherUserIds: string[] };

  //includes userId
  const allUserIds = [userId, ...otherUserIds].sort();

  const userConditions = allUserIds.map((userId) => ({
    participants: {
      some: {
        userId: userId,
      },
    },
  }));

  try {
    const existingConversation = await prisma.conversation.findMany({
      where: {
        AND: userConditions,
        participants: {
          every: {
            userId: {
              in: allUserIds,
            },
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (existingConversation !== null && existingConversation.length !== 0) {
      return res.status(400).json({ error: "Conversation already exists" });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          createMany: {
            data: allUserIds.map((userId) => ({
              userId: userId,
            })),
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    res.json(newConversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

export { createConversation, getAllConversations, getConversation };
