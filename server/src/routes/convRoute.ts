import express from "express";

import {
  createConversation,
  getAllConversations,
  getConversation,
} from "../controllers/convController";

const convRouter = express.Router();

convRouter.get("/", getAllConversations);
convRouter.get("/:id", getConversation);
convRouter.post("/", createConversation);

export default convRouter;
