/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";
import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

//used when users click the direct messages + button to setup empty conversation
const createConversation = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
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

export { createConversation };
