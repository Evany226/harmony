/* eslint-disable @typescript-eslint/no-namespace */
import { clerkClient } from "@clerk/clerk-sdk-node";
import prisma from "../lib/prisma";
import { Friend } from "../types";
import { Request, Response } from "express";

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
          requestId: friend.id,
          id: userObject.id,
          username: userObject.username,
          hasImage: userObject.hasImage,
          imageUrl: userObject.imageUrl,
        };
      })
    );

    res.json(pendingArr);
  } catch (error) {
    console.log("Error fetching pending friends:" + error);
    res.status(500).json({ error: "Error fetching pending friends:" + error });
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

    //checks if the user has already sent a friend request to the friend
    const pendingFromUserObject = {
      toUserId: friendId, //to friend
      fromUserId: req.auth.userId, //from user
      status: "pending",
    };

    const pendingFromUser = await prisma.friend.findFirst({
      where: pendingFromUserObject,
    });

    if (pendingFromUser !== null) {
      return res.status(400).json({
        error: "You have already sent a friend request to this user.",
      });
    }

    //checks if the friend has already sent a friend request to the user
    const pendingToUserObject = {
      toUserId: req.auth.userId,
      fromUserId: friendId,
      status: "pending",
    };

    const pendingToUser = await prisma.friend.findFirst({
      where: pendingToUserObject,
    });

    if (pendingToUser !== null) {
      return res.status(400).json({
        error: "This user has already sent you a friend request.",
      });
    }

    //checks if the user and friend are already friends
    const existingFriendObject = {
      OR: [
        {
          toUserId: req.auth.userId,
          fromUserId: friendId,
          status: "confirmed",
        },
        {
          toUserId: friendId,
          fromUserId: req.auth.userId,
          status: "confirmed",
        },
      ],
    };

    const existingFriend = await prisma.friend.findFirst({
      where: existingFriendObject,
    });

    if (existingFriend !== null) {
      return res.status(400).json({
        error: "You are already friends with this user.",
      });
    }

    //if no errors create friend request
    const newFriend = await prisma.friend.create({
      data: pendingFromUserObject,
    });

    res.json(newFriend);
  } catch (error) {
    console.error("Error processing friend request:", error);
    res.status(500).json({ error: "Error processing friend request:" + error });
  }
};

//accepts friend request
const acceptFriendRequest = async (req: Request, res: Response) => {
  const friendRequestId = req.params.id;

  try {
    const friend = await prisma.friend.update({
      where: {
        id: friendRequestId,
      },
      data: {
        status: "confirmed",
      },
    });

    res.json(friend);
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Error accepting friend request:" + error });
  }
};

const rejectFriendRequest = async (req: Request, res: Response) => {
  const friendRequestId = req.params.id;

  try {
    const friend = await prisma.friend.delete({
      where: {
        id: friendRequestId,
        status: "pending",
      },
    });

    res.json(friend);
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Error accepting friend request:" + error });
  }
};

export {
  getPendingFriends,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
