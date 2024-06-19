const express = require("express");
import cors from "cors";
// const friendsRouter = require("../src/controllers/friends.ts");

const app = express();

app.use(cors);
app.use(express.json());

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

app.get("/", async (_req: any, res: any) => {
  res.send("<h1>Hello World!</h1>");
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
