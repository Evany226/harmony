import express from "express";

// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/:guildId", getCategories);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:categoryId", updateCategory);
categoryRouter.delete("/:categoryId", deleteCategory);

export default categoryRouter;
