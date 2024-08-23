/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import prisma from "../lib/prisma";

import { ClerkExpressRequireAuth, StrictAuthProp } from "@clerk/clerk-sdk-node";

const friendsRouter = express.Router();

friendsRouter.get("/", async (_req, res) => {
  const users = await prisma.friend.findMany();
  console.log(users);
  res.json(users);
});

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

interface Friend {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: string | null; //get rid of null when u update database, rn database has status as String? meaning its optional
}

//gets all pending friend requests
friendsRouter.get("/pending", ClerkExpressRequireAuth({}), async (req, res) => {
  // Your route handler logic
  try {
    // const userId = req.auth.userId;
    const pending = await prisma.friend.findMany({
      where: {
        toUserId: "user_2kvgB9d6HPZNSZGsGDf02nYSx12",
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
    if (error instanceof Error) {
      console.error("Error getting pending", error);
      res.status(500).json({ error: "Error getting pending:" + error });
    }
  }
});

friendsRouter.post("/", ClerkExpressRequireAuth({}), async (req, res) => {
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
});

export default friendsRouter;
