import express from "express";
const friendsRouter = express.Router();

// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

friendsRouter.get("/", async (_req, res) => {
  // const users = await prisma.user.findMany();
  res.json("hello");
});

module.exports = friendsRouter;
