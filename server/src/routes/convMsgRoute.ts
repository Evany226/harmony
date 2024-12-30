import express from "express";

import {
  getAllMessages,
  createMessage,
  editMessage,
} from "../controllers/convMsgController";

const convMsgRouter = express.Router();

convMsgRouter.get("/:id", getAllMessages);
convMsgRouter.post("/", createMessage);
convMsgRouter.put("/", editMessage);

export default convMsgRouter;
