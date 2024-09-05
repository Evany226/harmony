import express from "express";

import { getAllGuilds, createGuild } from "../controllers/guildController";

const guildRouter = express.Router();

guildRouter.get("/", getAllGuilds);
guildRouter.get("/:id", getAllGuilds);
guildRouter.post("/", createGuild);

export default guildRouter;
