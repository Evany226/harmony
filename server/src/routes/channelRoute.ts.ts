import express from "express";

import {
  createChannel,
  getChannel,
  deleteChannel,
  getFirstChannel,
} from "../controllers/channelController";

const channelRouter = express.Router();

channelRouter.get("/:channelId", getChannel);
channelRouter.post("/", createChannel);
channelRouter.delete("/:channelId", deleteChannel);
channelRouter.get("/first/:guildId", getFirstChannel);

export default channelRouter;
