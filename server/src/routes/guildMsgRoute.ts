import express from "express";

import {
  createChannelMessage,
  getAllChannelMessages,
} from "../controllers/guildMsgController";

const guildMsgRouter = express.Router();

guildMsgRouter.get("/:channelId", getAllChannelMessages);
guildMsgRouter.post("/", createChannelMessage);

export default guildMsgRouter;
