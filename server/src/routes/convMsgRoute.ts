import express from "express";

import {
  getAllMessages,
  createMessage,
  editMessage,
} from "../controllers/convMsgController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const convMsgRouter = express.Router();

convMsgRouter.get("/:id", ClerkExpressRequireAuth({}), getAllMessages);
convMsgRouter.post("/", ClerkExpressRequireAuth({}), createMessage);
convMsgRouter.put("/", ClerkExpressRequireAuth({}), editMessage);

export default convMsgRouter;
