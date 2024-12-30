import express from "express";

import {
  createChannelMessage,
  getAllChannelMessages,
  editChannelMessage,
} from "../controllers/guildMsgController";

const guildMsgRouter = express.Router();

guildMsgRouter.get("/:channelId", getAllChannelMessages);
guildMsgRouter.post("/", createChannelMessage);
guildMsgRouter.put("/", editChannelMessage);

export default guildMsgRouter;
