import express from "express";
import {
  getLivekitToken,
  checkRoomEmpty,
  getActiveVoiceChannels,
} from "../controllers/livekitController";

const router = express.Router();

router.get("/participants/:guildId", getActiveVoiceChannels);
router.post("/get-token", getLivekitToken);
router.post("/room-empty", checkRoomEmpty);

export default router;
