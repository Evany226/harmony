import express from "express";

import { getAllMembers } from "../controllers/memberController";

const memberRouter = express.Router();

memberRouter.get("/:guildId", getAllMembers);

export default memberRouter;
