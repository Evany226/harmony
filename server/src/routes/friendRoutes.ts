import express from "express";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { getAllFriends } from "../controllers/friendController";

const friendsRouter = express.Router();

friendsRouter.get("/", ClerkExpressRequireAuth({}), getAllFriends);

export default friendsRouter;
