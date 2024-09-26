import express from "express";

import {
  createChannel,
  getChannel,
  deleteChannel,
  getFirstChannel,
  updateChannel,
} from "../controllers/channelController";
import { getUserChannelIds } from "../controllers/channelController";

const channelRouter = express.Router();

channelRouter.get("/:channelId", getChannel);
channelRouter.post("/", createChannel);
channelRouter.put("/:channelId", updateChannel);
channelRouter.delete("/:channelId", deleteChannel);
channelRouter.get("/first/:guildId", getFirstChannel);
channelRouter.get("/", getUserChannelIds);

export default channelRouter;
