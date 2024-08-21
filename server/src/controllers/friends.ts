import express from "express";
const friendsRouter = express.Router();

import prisma from "../lib/prisma";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

friendsRouter.get("/", async (_req, res) => {
  const users = await prisma.friend.findMany();
  console.log(users);
  res.json(users);
});

friendsRouter.post("/", async (_req, res) => {
  const friend = await prisma.friend.create({
    data: {
      id: "123",
      userId: "abc",
      status: "pending",
    },
  });
  res.json(friend);
});

export default friendsRouter;
