import express from "express";

import {
  getAllGuilds,
  createGuild,
  getGuild,
  leaveGuild,
  deleteGuild,
  getAllGuildIds,
} from "../controllers/guildController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const guildRouter = express.Router();

guildRouter.get("/", ClerkExpressRequireAuth({}), getAllGuilds);
guildRouter.get("/:id", ClerkExpressRequireAuth({}), getGuild);
guildRouter.get("/fetch/ids", ClerkExpressRequireAuth({}), getAllGuildIds); //fetches all ids of guilds the user is in
guildRouter.post("/", ClerkExpressRequireAuth({}), createGuild);
guildRouter.delete("/:guildId/leave", ClerkExpressRequireAuth({}), leaveGuild);
guildRouter.delete("/:guildId", ClerkExpressRequireAuth({}), deleteGuild);

export default guildRouter;
