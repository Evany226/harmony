/* eslint-disable @typescript-eslint/no-namespace */
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getPendingGuildReq = async (require: Request, res: Response) => {
  const userId = require.auth.userId;

  try {
    const pendingRequests = await prisma.guildRequests.findMany({
      where: {
        toUserId: userId,
        status: "pending",
      },
      include: {
        fromGuild: true,
      },
    });

    res.json(pendingRequests);
  } catch (error) {
    console.error("Error fetching pending guild requests:", error);
    res.status(500).json({ error: "Error fetching pending guild requests" });
  }
};

const createGuildRequest = async (req: Request, res: Response) => {
  const { guildId, username } = req.body as {
    guildId: string;
    username: string;
  };

  try {
    const users = await clerkClient.users
      .getUserList({
        username: [username],
      })
      .then((res) => res.data);

    if (!users || users.length === 0) {
      return res.status(404).json({
        error: "The username you are trying to send a request does not exist.",
      });
    }

    const friendId = users[0].id;

    //checks if the guild has already sent a friend request to the friend
    const pendingFromGuildObject = {
      toUserId: friendId, //to friend
      fromGuildId: guildId, //from user
      status: "pending",
    };

    const pendingFromGuild = await prisma.guildRequests.findFirst({
      where: pendingFromGuildObject,
    });

    if (pendingFromGuild !== null) {
      return res.json(pendingFromGuild);
    }

    const alreadyMember = await prisma.member.findFirst({
      where: {
        userId: friendId,
        guildId: guildId,
      },
    });

    if (alreadyMember !== null) {
      return res.status(400).json({
        error: "This user is already a member of the guild.",
      });
    }

    const newGuildRequest = await prisma.guildRequests.create({
      data: pendingFromGuildObject,
    });

    res.json(newGuildRequest);
  } catch (error) {
    console.error("Error creating guild request:", error);
    res.status(500).json({ error: "Error creating guild request:" + error });
  }
};

const acceptGuildRequest = async (req: Request, res: Response) => {
  const { guildRequestId } = req.params;

  try {
    const request = await prisma.guildRequests.update({
      where: {
        id: guildRequestId,
      },
      data: {
        status: "confirmed",
      },
    });

    res.status(200).json(request);
  } catch (error) {
    console.error("Error accepting guild request:", error);
    res.status(500).json({ error: "Error accepting guild request:" + error });
  }
};

const rejectGuildRequest = async (req: Request, res: Response) => {
  const { guildRequestId } = req.params;

  try {
    const request = await prisma.guildRequests.delete({
      where: {
        id: guildRequestId,
        status: "pending",
      },
    });
    res.json(request);
  } catch (error) {
    console.error("Error rejecting guild request:", error);
    res.status(500).json({ error: "Error rejecting guild request:" + error });
  }
};

export {
  createGuildRequest,
  getPendingGuildReq,
  acceptGuildRequest,
  rejectGuildRequest,
};
