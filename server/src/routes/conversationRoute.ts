import express from "express";

import {
  createConversation,
  getAllConversations,
  getConversation,
  createMessage,
  getAllMessages,
} from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.get("/", getAllConversations);
conversationRouter.get("/:id", getConversation);
conversationRouter.post("/", createConversation);

conversationRouter.get("/:id/messages", getAllMessages);
conversationRouter.post("/:id/message", createMessage);

export default conversationRouter;
