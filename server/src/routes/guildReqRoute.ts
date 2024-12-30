import express from "express";
import {
  createGuildRequest,
  getPendingGuildReq,
  acceptGuildRequest,
  rejectGuildRequest,
} from "../controllers/guildReqController";

const guildReqRouter = express.Router();

guildReqRouter.get("/", getPendingGuildReq);
guildReqRouter.post("/", createGuildRequest);
guildReqRouter.put("/:guildRequestId/accept", acceptGuildRequest);
guildReqRouter.delete("/:guildRequestId/reject", rejectGuildRequest);

export default guildReqRouter;
