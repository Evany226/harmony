/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import cors from "cors";
import friendsRouter from "./routes/friendRoutes";
import requestRouter from "./routes/requestRoute";
import conversationRouter from "./routes/conversationRoute";
import guildRouter from "./routes/guildRoute";
import categoryRouter from "./routes/categoryRoute";
import channelRouter from "./routes/channelRoute.ts";
import { Server } from "socket.io";
import { Message } from "./types";
import { clerkClient } from "@clerk/clerk-sdk-node";

import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";
import express, { Request } from "express";

//https://clerk.com/docs/backend-requests/handling/nodejs
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.get(
  "/",
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  (req: RequireAuthProp<Request>, res) => {
    // Your route handler logic
    res.json(req.auth.userId);
  }
);

app.use("/api/friends", friendsRouter);
app.use("/api/requests", requestRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/guilds", guildRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/channels", channelRouter);

const PORT = 3001;

const httpServer = app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);

//socketio for real time chat

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers: string[] = [];

io.on("connection", (socket) => {
  console.log("User has connected");
  let id = "no_user_id";
  const count = io.engine.clientsCount;
  console.log(count);

  socket.on("joinOnline", (userId: string) => {
    id = userId;

    onlineUsers.push(userId);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("joinRoom", (conversationIds: string[]) => {
    conversationIds.forEach(async (conversationId) => {
      await socket.join(conversationId);
      console.log(`User joined room ${conversationId}`);
    });
  });

  socket.on("joinConversation", async (conversationId: string) => {
    await socket.join(conversationId);
    console.log(`User joined conversation ${conversationId}`);
    socket.to(conversationId).emit("joinConversation");
  });

  socket.on("message", (data: Message) => {
    const { conversationId } = data;
    io.to(conversationId).emit(`message ${conversationId}`, data);
  });

  socket.on("notification", (data: Message) => {
    const { conversationId } = data;
    socket.to(conversationId).emit(`notification`, data);
  });

  socket.on("disconnecting", () => {
    console.log("disconnecting");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log(id);
    onlineUsers = onlineUsers.filter((userId) => userId !== id);
  });
});
