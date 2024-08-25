/* eslint-disable @typescript-eslint/no-namespace */
import { clerkClient } from "@clerk/clerk-sdk-node";
import prisma from "../lib/prisma";
import { Friend } from "../types";
import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

//fetches all friends
const getAllFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.userId;
    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          {
            toUserId: userId,
          },
          {
            fromUserId: userId,
          },
        ],
        status: "confirmed",
      },
    });

    const friendsArr = await Promise.all(
      friends.map(async (friend: Friend) => {
        let friendId = friend.fromUserId;
        if (friendId === userId) {
          friendId = friend.toUserId;
          const userObject = await clerkClient.users.getUser(friendId);

          return {
            requestId: friend.id,
            id: userObject.id,
            username: userObject.username,
            hasImage: userObject.hasImage,
            imageUrl: userObject.imageUrl,
          };
        } else {
          const userObject = await clerkClient.users.getUser(friendId);

          return {
            requestId: friend.id,
            id: userObject.id,
            username: userObject.username,
            hasImage: userObject.hasImage,
            imageUrl: userObject.imageUrl,
          };
        }
      })
    );

    res.json(friendsArr);
  } catch (error) {
    console.log("Error fetching all friends:" + error);
    res.status(500).json({ error: "Error fetching all friends:" + error });
  }
};

const removeFriend = async (req: Request, res: Response) => {
  const friendRequestId = req.params.id;
  const userId = req.auth.userId;

  try {
    const removedFriend = await prisma.friend.delete({
      where: {
        id: friendRequestId,
        OR: [
          {
            toUserId: userId,
          },
          {
            fromUserId: userId,
          },
        ],
        status: "confirmed",
      },
    });
    res.json(removedFriend);
  } catch (error) {
    console.log("Error removing friend:" + error);
    res.status(500).json({ error: "Error removing friend:" + error });
  }
};

export { getAllFriends, removeFriend };
