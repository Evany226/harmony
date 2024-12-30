import express from "express";

import {
  getUserGuildIds,
  getUserChannelIds,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/guildIds", getUserGuildIds);
userRouter.get("/channelIds", getUserChannelIds);

export default userRouter;
