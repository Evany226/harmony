import express from "express";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { getAllFriends, removeFriend } from "../controllers/friendController";

const friendsRouter = express.Router();

friendsRouter.get("/", ClerkExpressRequireAuth({}), getAllFriends);
friendsRouter.delete("/:id", ClerkExpressRequireAuth({}), removeFriend);

export default friendsRouter;
