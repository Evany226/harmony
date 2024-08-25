import express from "express";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  getPendingFriends,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../controllers/requestController";

const requestRouter = express.Router();

requestRouter.get("/", ClerkExpressRequireAuth({}), getPendingFriends);
requestRouter.post("/", ClerkExpressRequireAuth({}), createFriendRequest);
requestRouter.put(
  "/:id/accept",
  ClerkExpressRequireAuth({}),
  acceptFriendRequest
);
requestRouter.delete(
  "/:id/reject",
  ClerkExpressRequireAuth({}),
  rejectFriendRequest
);

export default requestRouter;
