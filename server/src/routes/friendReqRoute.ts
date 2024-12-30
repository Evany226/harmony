import express from "express";

import {
  getPendingFriends,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../controllers/friendReqController";

const friendReqRouter = express.Router();

friendReqRouter.get("/", getPendingFriends);
friendReqRouter.post("/", createFriendRequest);
friendReqRouter.put("/:id/accept", acceptFriendRequest);
friendReqRouter.delete("/:id/reject", rejectFriendRequest);

export default friendReqRouter;
