import express from "express";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  getAllFriends,
  getPendingFriends,
  createFriendRequest,
} from "../controllers/friendController";

const friendsRouter = express.Router();

friendsRouter.get("/", ClerkExpressRequireAuth({}), getAllFriends);
friendsRouter.get("/pending", ClerkExpressRequireAuth({}), getPendingFriends);
friendsRouter.post("/", ClerkExpressRequireAuth({}), createFriendRequest);

export default friendsRouter;
