import express from "express";

import {
  getAllMessages,
  createMessage,
} from "../controllers/convMsgController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const convMsgRouter = express.Router();

convMsgRouter.get("/:id", ClerkExpressRequireAuth({}), getAllMessages);
convMsgRouter.post("/", ClerkExpressRequireAuth({}), createMessage);

export default convMsgRouter;
