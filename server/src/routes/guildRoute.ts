import express from "express";

import {
  getAllGuilds,
  createGuild,
  getGuild,
  leaveGuild,
} from "../controllers/guildController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const guildRouter = express.Router();

guildRouter.get("/", ClerkExpressRequireAuth({}), getAllGuilds);
guildRouter.get("/:id", ClerkExpressRequireAuth({}), getGuild);
guildRouter.post("/", ClerkExpressRequireAuth({}), createGuild);
guildRouter.delete("/:guildId", ClerkExpressRequireAuth({}), leaveGuild);

export default guildRouter;
