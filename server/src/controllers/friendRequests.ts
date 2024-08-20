import express from "express";
const friendRequestsRouter = express.Router();

import prisma from "../lib/prisma";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

friendRequestsRouter.get(
  "/",
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  async (req, res) => {
    // Your route handler logic
    try {
      //   const userId = req.auth.userId;
      const friends = await prisma.friend.findMany({});
      res.json(friends);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.json(error.message);
      }
    }
  }
);

//adds a friend request
friendRequestsRouter.post("/", async (_req, res) => {
  const friend = await prisma.friend.create({
    data: {
      userId1: 1,
      userId2: 5,
      status: "pending",
    },
  });
  res.json(friend);
});

export default friendRequestsRouter;
