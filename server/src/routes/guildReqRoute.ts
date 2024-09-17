import express from "express";
import {
  createGuildRequest,
  getPendingGuildReq,
} from "../controllers/guildReqController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const guildReqRouter = express.Router();

guildReqRouter.get("/", ClerkExpressRequireAuth({}), getPendingGuildReq);
guildReqRouter.post("/", createGuildRequest);

export default guildReqRouter;
