import express from "express";

import {
  createConversation,
  getAllConversations,
  getConversation,
} from "../controllers/convController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const convRouter = express.Router();

convRouter.get("/", ClerkExpressRequireAuth({}), getAllConversations);
convRouter.get("/:id", ClerkExpressRequireAuth({}), getConversation);
convRouter.post("/", ClerkExpressRequireAuth({}), createConversation);

export default convRouter;
