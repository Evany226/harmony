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

//gets all pending friend requests
friendsRouter.get(
  "/requests",
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  async (req, res) => {
    // Your route handler logic
    try {
      //   const userId = req.auth.userId;
      const friends = await prisma.friend.findMany({
        where: {
          userId: req.auth.userId,
          status: "pending",
        },
      });
      res.json(friends);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.json(error.message);
      }
    }
  }
);

friendsRouter.post("/", ClerkExpressRequireAuth({}), async (req, res) => {
  try {
    const { username } = req.body as { username: string };

    console.log(username);

    //grabs the user id of the friend you're sending the request to
    const users = await clerkClient.users
      .getUserList({
        username: [username],
      })
      .then((res) => res.data);

    console.log(users);

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendObject = users[0];

    const friend = await prisma.friend.create({
      data: {
        id: friendObject.id, //to friend
        userId: req.auth.userId, //from user
        status: "pending",
      },
    });
    res.json(friend);
  } catch (error) {
    console.error("Error processing friend request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default friendsRouter;
