import express from "express";

import {
  getMember,
  getAllMembers,
  getAllMemberIds,
} from "../controllers/memberController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const memberRouter = express.Router();

memberRouter.get("/:guildId", ClerkExpressRequireAuth({}), getAllMembers);
memberRouter.get("/:guildId/single", ClerkExpressRequireAuth({}), getMember);
memberRouter.get("/:guildId/ids", getAllMemberIds);

export default memberRouter;
