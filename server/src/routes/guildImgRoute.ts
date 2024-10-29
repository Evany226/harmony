import express from "express";

const router = express.Router();

import { uploadGuildImage } from "../controllers/guildImgController";
import { upload } from "../lib/awsS3";

router.post("/upload/:guildId", upload.single("photos"), uploadGuildImage);

export default router;
