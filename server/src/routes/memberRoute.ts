import express from "express";

import {
  getMember,
  getAllMembers,
  getAllMemberIds,
} from "../controllers/memberController";

const memberRouter = express.Router();

memberRouter.get("/:guildId", getAllMembers);
memberRouter.get("/:guildId/single", getMember);
memberRouter.get("/:guildId/ids", getAllMemberIds);

export default memberRouter;
