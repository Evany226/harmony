import express from "express";
import {
  createGuildRequest,
  getPendingGuildReq,
  acceptGuildRequest,
  rejectGuildRequest,
} from "../controllers/guildReqController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const guildReqRouter = express.Router();

guildReqRouter.get("/", ClerkExpressRequireAuth({}), getPendingGuildReq);
guildReqRouter.post("/", createGuildRequest);
guildReqRouter.put("/:guildRequestId/accept", acceptGuildRequest);
guildReqRouter.delete("/:guildRequestId/reject", rejectGuildRequest);

export default guildReqRouter;
