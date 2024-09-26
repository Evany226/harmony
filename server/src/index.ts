/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import cors from "cors";
import friendsRouter from "./routes/friendRoutes";
import friendReqRouter from "./routes/friendReqRoute";
import conversationRouter from "./routes/conversationRoute";
import guildRouter from "./routes/guildRoute";
import categoryRouter from "./routes/categoryRoute";
import channelRouter from "./routes/channelRoute.ts";
import memberRouter from "./routes/memberRoute";
import guildReqRouter from "./routes/guildReqRoute";
import guildMsgRouter from "./routes/guildMsgRoute";
import { Server } from "socket.io";
import { Message, ChannelMessage } from "./types";
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
app.use("/api/requests", friendReqRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/guilds", guildRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/channels", channelRouter);
app.use("/api/members", memberRouter);
app.use("/api/guild-requests", guildReqRouter);
app.use("/api/guild-messages", guildMsgRouter);

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

interface socketUser {
  userId: string;
  socketId: string;
}

let onlineUsers: socketUser[] = [];

io.on("connection", (socket) => {
  console.log("User has connected");
  let id = "no_user_id";
  const count = io.engine.clientsCount;
  console.log(count);

  socket.on("joinOnline", (userId: string) => {
    id = userId;

    onlineUsers.push({ userId, socketId: socket.id });

    console.log(onlineUsers);

    const onlineUsersArray = onlineUsers.map((user) => user.userId);
    io.emit("onlineUsers", onlineUsersArray);
  });

  socket.on("joinRoom", (roomIds: string[]) => {
    roomIds.forEach(async (roomId) => {
      await socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });
  });

  socket.on(
    "joinConversation",
    (data: { conversationId: string; participantIds: string[] }) => {
      const { conversationId, participantIds } = data;

      participantIds.forEach((userId: string) => {
        const user = onlineUsers.find((user) => user.userId === userId);
        if (user) {
          io.in(user.socketId).socketsJoin(conversationId);
          console.log(`Second client joined ${conversationId}`);
        }
      });

      console.log(participantIds);

      socket.to(conversationId).emit("joinConversation");
    }
  );

  socket.on("message", (data: Message) => {
    const { conversationId } = data;
    io.to(conversationId).emit(`message ${conversationId}`, data);
  });

  socket.on("notification", (data: Message) => {
    const { conversationId } = data;
    socket.to(conversationId).emit(`notification`, data);
  });

  socket.on("channelMessage", (data: ChannelMessage) => {
    const { channelId } = data;
    console.log(data);
    io.to(channelId).emit(`channelMessage ${channelId}`, data);
  });

  socket.on("disconnecting", () => {
    console.log("disconnecting");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log(id);
    onlineUsers = onlineUsers.filter((user) => user.userId !== id);
  });
});
