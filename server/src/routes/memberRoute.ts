import express from "express";

import { getAllMembers } from "../controllers/memberController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const memberRouter = express.Router();

memberRouter.get("/:guildId", ClerkExpressRequireAuth({}), getAllMembers);

export default memberRouter;
