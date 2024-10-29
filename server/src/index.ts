/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import cors from "cors";
import friendRouter from "./routes/friendRoute";
import friendReqRouter from "./routes/friendReqRoute";
import convRouter from "./routes/convRoute";
import convMsgRouter from "./routes/convMsgRoute";
import guildRouter from "./routes/guildRoute";
import categoryRouter from "./routes/categoryRoute";
import channelRouter from "./routes/channelRoute.ts";
import memberRouter from "./routes/memberRoute";
import guildReqRouter from "./routes/guildReqRoute";
import guildMsgRouter from "./routes/guildMsgRoute";
import userRouter from "./routes/userRoute";
import unreadMsgRouter from "./routes/unreadMsgRoute";
import guildImageRouter from "./routes/guildImgRoute";
import { Server } from "socket.io";
import { Message, ChannelMessage } from "./types";
import bodyParser from "body-parser";

import { roomService } from "./lib/livekit";
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

export const app = express();

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

app.use("/api/friends", friendRouter);
app.use("/api/requests", friendReqRouter);
app.use("/api/conversations", convRouter);
app.use("/api/messages", convMsgRouter);
app.use("/api/guilds", guildRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/channels", channelRouter);
app.use("/api/members", memberRouter);
app.use("/api/guild-requests", guildReqRouter);
app.use("/api/guild-messages", guildMsgRouter);
app.use("/api/users", userRouter);
app.use("/api/unread", unreadMsgRouter);
app.use("/api/guild-image", guildImageRouter);

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
    });
  });

  socket.on("joinGuild", async (guildId: string) => {
    await socket.join(guildId);
    socket.to(guildId).emit("updateGuild");
    console.log(`New User Joined guild: ${guildId}`);
  });

  socket.on("leaveGuild", async (guildId: string) => {
    await socket.leave(guildId);
    socket.to(guildId).emit("updateGuild");
    console.log("User left guild");
  });

  socket.on("createNewChannel", (channelId: string, guildId: string) => {
    console.log(`Current user joined new channel: ${channelId}`);
    io.to(guildId).emit("newChannel", channelId);
  });

  socket.on("joinChannel", async (channelId: string) => {
    await socket.join(channelId);
    console.log(`User joined new channel: ${channelId}`);
  });

  socket.on("refresh", (guildId: string) => {
    socket.to(guildId).emit("refresh");
  });

  socket.on(
    "joinConversation",
    (data: { conversationId: string; participantIds: string[] }) => {
      const { conversationId, participantIds } = data;

      participantIds.forEach((userId: string) => {
        const user = onlineUsers.find((user) => user.userId === userId);
        if (user) {
          io.in(user.socketId).socketsJoin(conversationId);
        }
      });

      console.log(participantIds);

      socket.to(conversationId).emit("refresh");
    }
  );

  socket.on("inviteRefresh", (userId: string) => {
    const user = onlineUsers.find((user) => user.userId === userId);

    if (user) {
      io.in(user.socketId).emit("refresh");
    }
  });

  socket.on("message", (data: Message) => {
    const { conversationId } = data;
    io.to(conversationId).emit(`message ${conversationId}`, data);
  });

  socket.on("editMessage", (data: Message) => {
    const { conversationId } = data;
    io.to(conversationId).emit(`editMessage ${conversationId}`, data);
  });

  socket.on("notification", (data: Message) => {
    const { conversationId } = data;
    socket.to(conversationId).emit(`notification`, data);
    socket.to(conversationId).emit(`unread ${conversationId}`);
  });

  socket.on("newVoiceCall", (conversationId: string, imageUrl: string) => {
    socket
      .to(conversationId)
      .emit(`incomingVoiceCall`, conversationId, imageUrl);

    io.to(conversationId).emit(`checkRoomEmpty ${conversationId}`, false);
  });

  socket.on("checkRoomEmpty", async (conversationId: string) => {
    const rooms = await roomService.listRooms();
    const room = rooms.find((room) => room.name === conversationId);

    let isEmpty;

    if (!room) {
      isEmpty = true;
    }

    const result = await roomService.listParticipants(conversationId);

    if (result.length === 0) {
      isEmpty = true;
    } else {
      isEmpty = false;
    }

    io.to(conversationId).emit(`checkRoomEmpty ${conversationId}`, isEmpty);
  });

  socket.on("channelMessage", (data: ChannelMessage) => {
    const { channelId } = data;
    console.log(data);
    io.to(channelId).emit(`channelMessage ${channelId}`, data);
  });

  socket.on("editChannelMessage", (data: ChannelMessage) => {
    const { channelId } = data;
    io.to(channelId).emit(`editChannelMessage ${channelId}`, data);
  });

  socket.on("disconnecting", () => {
    console.log("disconnecting");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log(id);
    onlineUsers = onlineUsers.filter((user) => user.userId !== id);
    io.emit(
      "onlineUsers",
      onlineUsers.map((user) => user.userId)
    );
  });
});
