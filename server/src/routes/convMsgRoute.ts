import express from "express";

import {
  getAllMessages,
  createMessage,
  getUnreadMessages,
  updateLastViewed,
} from "../controllers/convMsgController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const convMsgRouter = express.Router();

convMsgRouter.get("/:id", ClerkExpressRequireAuth({}), getAllMessages);
convMsgRouter.post("/", ClerkExpressRequireAuth({}), createMessage);
convMsgRouter.get(
  "/:conversationId/unread",
  ClerkExpressRequireAuth({}),
  getUnreadMessages
);
convMsgRouter.put(
  "/updateLastViewed",
  ClerkExpressRequireAuth({}),
  updateLastViewed
);

export default convMsgRouter;
