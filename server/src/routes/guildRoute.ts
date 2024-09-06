import express from "express";

import {
  getAllGuilds,
  createGuild,
  getGuild,
} from "../controllers/guildController";

const guildRouter = express.Router();

guildRouter.get("/", getAllGuilds);
guildRouter.get("/:id", getGuild);
guildRouter.post("/", createGuild);

export default guildRouter;
