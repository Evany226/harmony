import express from "express";

import {
  createConversation,
  getAllConversations,
  getConversation,
} from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.get("/", getAllConversations);
conversationRouter.get("/:id", getConversation);
conversationRouter.post("/", createConversation);

export default conversationRouter;
