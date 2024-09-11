import express from "express";

import { createChannel, getChannel } from "../controllers/channelController";

const channelRouter = express.Router();

channelRouter.get("/:channelId", getChannel);
channelRouter.post("/", createChannel);

export default channelRouter;
