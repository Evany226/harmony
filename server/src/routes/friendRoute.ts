import express from "express";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { getAllFriends, removeFriend } from "../controllers/friendController";

const friendRouter = express.Router();

friendRouter.get("/", ClerkExpressRequireAuth({}), getAllFriends);
friendRouter.delete("/:id", ClerkExpressRequireAuth({}), removeFriend);

export default friendRouter;
