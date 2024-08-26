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
  // const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const allConversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            // some makes it so at least one of the users has an id of userId
            id: userId,
          },
        },
      },
      include: {
        users: true, // Include all posts in the returned object
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
        users: true,
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
  // const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";
  const { participantIds } = req.body as { participantIds: string[] };

  try {
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: userId }, ...participantIds.map((id) => ({ id }))],
        },
      },
      include: {
        users: true, // Include all posts in the returned object
      },
    });

    res.json(newConversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

export { createConversation, getAllConversations, getConversation };
