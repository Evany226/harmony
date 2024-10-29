import express from "express";
import {
  getLivekitToken,
  checkRoomEmpty,
} from "../controllers/livekitController";

const router = express.Router();

router.post("/get-token", getLivekitToken);
router.post("/room-empty", checkRoomEmpty);

export default router;
