import express from "express";
const friendsRouter = express.Router();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

friendsRouter.get("/", async (_req, res) => {
  const users = await prisma.friend.findMany();
  console.log(users);
  res.json(users);
});

friendsRouter.post("/", async (_req, res) => {
  const friend = await prisma.friend.create({
    data: {
      userId1: 1,
      userId2: 5,
      status: "pending",
    },
  });
  res.json(friend);
});

export default friendsRouter;
