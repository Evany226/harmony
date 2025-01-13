import express from "express";

import {
  getUserGuildIds,
  getUserChannelIds,
  getUserConversationIds,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/guildIds", getUserGuildIds);
userRouter.get("/channelIds", getUserChannelIds);
userRouter.get("/conversationIds", getUserConversationIds);

export default userRouter;
