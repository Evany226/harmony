import express from "express";
import {
  getLivekitToken,
  checkRoomEmpty,
  getParticipants,
} from "../controllers/livekitController";

const router = express.Router();

router.get("/participants/:guildId", getParticipants);
router.post("/get-token", getLivekitToken);
router.post("/room-empty", checkRoomEmpty);

export default router;
