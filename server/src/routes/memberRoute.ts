import express from "express";

import { getMember, getAllMembers } from "../controllers/memberController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const memberRouter = express.Router();

memberRouter.get("/:guildId", ClerkExpressRequireAuth({}), getAllMembers);
memberRouter.get("/:guildId/single", ClerkExpressRequireAuth({}), getMember);

export default memberRouter;
