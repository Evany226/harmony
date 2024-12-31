import express from "express";

import { getAllFriends, removeFriend } from "../controllers/friendController";

const friendRouter = express.Router();

friendRouter.get("/", getAllFriends);
friendRouter.delete("/:id", removeFriend);

export default friendRouter;
