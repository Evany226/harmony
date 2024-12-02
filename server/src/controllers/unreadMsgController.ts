/* eslint-disable @typescript-eslint/no-namespace */
import prisma from "../lib/prisma";
import { Request, Response } from "express"; // Add this import statement

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getAllUnreadMessages = async (req: Request, res: Response) => {
  // const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const participants = await prisma.participant.findMany({
      where: {
        userId: userId,
      },
    });

    const unreadMessages = [];

    for (const participant of participants) {
      const messages = await prisma.message.findMany({
        where: {
          conversationId: participant.conversationId,
          sender: {
            userId: {
              not: userId, // Exclude messages sent by the current user
            },
          },
          createdAt: {
            gt: participant.lastViewed, // Only get messages after lastViewed
          },
        },
        include: {
          sender: {
            include: {
              user: true,
            },
          },
        },
      });

      if (messages.length > 0) {
        unreadMessages.push({
          participantId: participant.id,
          messages: messages,
        });
      }
    }

    res.json(unreadMessages);
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res.status(500).json({ error: "Failed to fetch unread messages" });
  }
};

//this one fetches individual unread messages. returns the number of unread messages.
// const getUnreadMessages = async (req: Request, res: Response) => {
//   const userId = req.auth.userId;
//   const { conversationId } = req.params as { conversationId: string };
//   // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

//   try {
//     const participant = await prisma.participant.findFirst({
//       where: {
//         userId: userId,
//         conversationId: conversationId,
//       },
//     });

//     if (!participant) {
//       return res.status(404).json({ error: "Participant not found" });
//     }

//     const unreadMessages = await prisma.message.findMany({
//       where: {
//         conversationId: conversationId,
//         sender: {
//           userId: {
//             not: userId,
//           },
//         },
//         createdAt: {
//           gt: participant.lastViewed,
//         },
//       },
//       include: {
//         sender: true,
//       },
//     });

//     res.json(unreadMessages.length);
//   } catch (error) {
//     console.error("Error fetching unread messages:", error);
//     res.status(500).json({ error: "Failed to fetch unread messages" });
//   }
// };

const updateLastViewed = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  const { conversationId } = req.params as { conversationId: string };
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const participant = await prisma.participant.findFirst({
      where: {
        userId: userId,
        conversationId: conversationId,
      },
      include: {
        user: true,
      },
    });

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    console.log(participant.user.username);

    const updatedParticipant = await prisma.participant.update({
      where: {
        id: participant.id,
        conversationId: conversationId,
      },
      data: {
        lastViewed: new Date(),
      },
    });

    res.json(updatedParticipant);
  } catch (error) {
    console.error("Error updating last viewed:", error);
    res.status(500).json({ error: "Failed to update last viewed" });
  }
};

export { getAllUnreadMessages, updateLastViewed };
