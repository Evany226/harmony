import express from "express";

import { createChannel } from "../controllers/channelController";

const channelRouter = express.Router();

channelRouter.post("/", createChannel);

export default channelRouter;
