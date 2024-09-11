import { Request, Response } from "express";
import prisma from "../lib/prisma";

const getAllMembers = async (req: Request, res: Response) => {
  const { guildId } = req.params as { guildId: string };

  try {
    const members = await prisma.member.findMany({
      where: {
        guildId: guildId,
      },
      include: {
        user: true,
      },
    });

    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to get members" });
  }
};

export { getAllMembers };
