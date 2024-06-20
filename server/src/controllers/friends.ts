import express from "express";
const friendsRouter = express.Router();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

friendsRouter.get("/", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// friendsRouter.post("/", async (req, res) => {
//   const body = req.body;
//   const friend = await prisma.friend.create({});
//   res.json();
// });

export default friendsRouter;
