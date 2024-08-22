/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
const friendsRouter = express.Router();

import prisma from "../lib/prisma";

import { ClerkExpressRequireAuth, StrictAuthProp } from "@clerk/clerk-sdk-node";

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

friendsRouter.post(
  "/",
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  async (req, res) => {
    const friend = await prisma.friend.create({
      data: {
        id: "123",
        userId: req.auth.userId,
        status: "pending",
      },
    });
    res.json(friend);
  }
);

export default friendsRouter;
