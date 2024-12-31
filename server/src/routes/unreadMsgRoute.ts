import express from "express";

import {
  getAllUnreadMessages,
  // getUnreadMessages,
  updateLastViewed,
} from "../controllers/unreadMsgController";

const unreadMsgRouter = express.Router();

// unreadMsgRouter.get(
//   "/:conversationId"
//   // getUnreadMessages
// );
unreadMsgRouter.get("/", getAllUnreadMessages);
unreadMsgRouter.put(
  "/updateLastViewed",

  updateLastViewed
);

export default unreadMsgRouter;
