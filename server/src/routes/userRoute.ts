import express from "express";

import {
  getUserGuildIds,
  getUserChannelIds,
} from "../controllers/userController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const userRouter = express.Router();

userRouter.get("/guildIds", ClerkExpressRequireAuth({}), getUserGuildIds);
userRouter.get("/channelIds", ClerkExpressRequireAuth({}), getUserChannelIds);

export default userRouter;
