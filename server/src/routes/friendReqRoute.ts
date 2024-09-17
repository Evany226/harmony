import express from "express";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  getPendingFriends,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../controllers/friendReqController";

const friendReqRouter = express.Router();

friendReqRouter.get("/", ClerkExpressRequireAuth({}), getPendingFriends);
friendReqRouter.post("/", ClerkExpressRequireAuth({}), createFriendRequest);
friendReqRouter.put(
  "/:id/accept",
  ClerkExpressRequireAuth({}),
  acceptFriendRequest
);
friendReqRouter.delete(
  "/:id/reject",
  ClerkExpressRequireAuth({}),
  rejectFriendRequest
);

export default friendReqRouter;
