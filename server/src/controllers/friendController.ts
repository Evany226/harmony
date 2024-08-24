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
            id: userObject.id,
            username: userObject.username,
            hasImage: userObject.hasImage,
            imageUrl: userObject.imageUrl,
          };
        } else {
          const userObject = await clerkClient.users.getUser(friendId);

          return {
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
    console.log("Error in friend request route handler:" + error);
    res.status(500).json({ error: "Error processing friend request:" + error });
  }
};

//gets all pending friend requests
const getPendingFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.userId;
    const pending = await prisma.friend.findMany({
      where: {
        toUserId: userId,
        status: "pending",
      },
    });
    const pendingArr = await Promise.all(
      pending.map(async (friend: Friend) => {
        const friendId = friend.fromUserId;
        const userObject = await clerkClient.users.getUser(friendId);

        return {
          id: userObject.id,
          username: userObject.username,
          hasImage: userObject.hasImage,
          imageUrl: userObject.imageUrl,
        };
      })
    );

    res.json(pendingArr);
  } catch (error) {
    console.log("Error in friend request route handler:" + error);
    res.status(500).json({ error: "Error processing friend request:" + error });
  }
};

const createFriendRequest = async (req: Request, res: Response) => {
  const { username } = req.body as { username: string };

  console.log(username);

  try {
    //grabs the user id of the friend you're sending the request to
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

    const dataObject = {
      toUserId: friendId, //to friend
      fromUserId: req.auth.userId, //from user
      status: "pending",
    };

    const friend = await prisma.friend.findFirst({
      where: dataObject,
    });

    if (friend !== null) {
      return res.status(400).json({
        error: "You have already sent a friend request to this user.",
      });
    }

    const newFriend = await prisma.friend.create({
      data: dataObject,
    });

    res.json(newFriend);
  } catch (error) {
    console.error("Error processing friend request:", error);
    res.status(500).json({ error: "Error processing friend request:" + error });
  }
};

export { getAllFriends, getPendingFriends, createFriendRequest };
