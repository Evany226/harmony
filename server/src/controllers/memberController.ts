/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from "express";
import prisma from "../lib/prisma";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getMember = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  const { guildId } = req.params as { guildId: string };
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const member = await prisma.member.findUnique({
      where: {
        userId_guildId: {
          userId: userId,
          guildId: guildId,
        },
      },
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to get member" });
  }
};

const getAllMembers = async (req: Request, res: Response) => {
  const { guildId } = req.params as { guildId: string };

  try {
    const members = await prisma.member.findMany({
      where: {
        guildId: guildId,
      },
      select: {
        id: true,
        role: true,
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
      },
    });

    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to get members" });
  }
};

const getAllMemberIds = async (req: Request, res: Response) => {
  const { guildId } = req.params as { guildId: string };

  try {
    const members = await prisma.member.findMany({
      where: {
        guildId: guildId,
      },
      select: {
        userId: true,
      },
    });

    const memberIdArr = members.map((member) => member.userId);

    res.json(memberIdArr);
  } catch (error) {
    res.status(500).json({ error: "Failed to get members" });
  }
};

export { getAllMembers, getMember, getAllMemberIds };
