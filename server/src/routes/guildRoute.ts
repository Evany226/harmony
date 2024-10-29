import express from "express";

import {
  getAllGuilds,
  createGuild,
  getGuild,
  leaveGuild,
  deleteGuild,
} from "../controllers/guildController";

import { upload } from "../lib/awsS3";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const guildRouter = express.Router();

guildRouter.get("/", ClerkExpressRequireAuth({}), getAllGuilds);
guildRouter.get("/:id", ClerkExpressRequireAuth({}), getGuild);
guildRouter.post(
  "/",

  upload.single("photos"),
  // ClerkExpressRequireAuth({}),
  createGuild
);
guildRouter.delete("/:guildId/leave", ClerkExpressRequireAuth({}), leaveGuild);
guildRouter.delete("/:guildId", ClerkExpressRequireAuth({}), deleteGuild);

export default guildRouter;
