import express from "express";
import {
  getLivekitToken,
  getActiveVoiceChannels,
  checkUserInRoom,
} from "../controllers/livekitController";

const router = express.Router();

router.get("/participants/:guildId", getActiveVoiceChannels);
router.post("/get-token", getLivekitToken);
router.post("/user-in-room", checkUserInRoom);

export default router;
