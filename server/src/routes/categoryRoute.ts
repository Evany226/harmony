import express from "express";

// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
  createCategory,
  getCategories,
} from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/:guildId", getCategories);
categoryRouter.post("/", createCategory);

export default categoryRouter;
