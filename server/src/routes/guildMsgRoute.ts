import express from "express";

import {
  createChannelMessage,
  getAllChannelMessages,
  editChannelMessage,
} from "../controllers/guildMsgController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const guildMsgRouter = express.Router();

guildMsgRouter.get("/:channelId", getAllChannelMessages);
guildMsgRouter.post("/", ClerkExpressRequireAuth({}), createChannelMessage);
guildMsgRouter.put("/", ClerkExpressRequireAuth({}), editChannelMessage);

export default guildMsgRouter;
