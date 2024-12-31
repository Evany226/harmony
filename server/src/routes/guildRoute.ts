import express from "express";

import {
  getAllGuilds,
  createGuild,
  getGuild,
  leaveGuild,
  deleteGuild,
  updateGuild,
} from "../controllers/guildController";

import { upload } from "../lib/awsS3";

const guildRouter = express.Router();

guildRouter.get("/", getAllGuilds);
guildRouter.get("/:id", getGuild);
guildRouter.post(
  "/",

  upload.single("photos"),
  createGuild
);
guildRouter.delete("/:guildId/leave", leaveGuild);
guildRouter.delete("/:guildId", deleteGuild);
guildRouter.put("/upload-image", upload.single("file"), updateGuild);

export default guildRouter;
