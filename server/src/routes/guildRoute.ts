import express from "express";

import {
  getAllGuilds,
  createGuild,
  getGuild,
} from "../controllers/guildController";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const guildRouter = express.Router();

guildRouter.get("/", ClerkExpressRequireAuth({}), getAllGuilds);
guildRouter.get("/:id", ClerkExpressRequireAuth({}), getGuild);
guildRouter.post("/", ClerkExpressRequireAuth({}), createGuild);

export default guildRouter;
