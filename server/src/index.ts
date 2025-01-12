/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import cors from "cors";
import configRoutes from "./routes/index";
import { Server } from "socket.io";
import { Message, ChannelMessage, WebhookEvent } from "./types";

import { roomService } from "./lib/livekit";
import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import { RequireAuthProp, StrictAuthProp } from "@clerk/clerk-sdk-node";
import express, { Request, Response } from "express";
import { Webhook } from "svix"; // Assuming you have a package for Svix
import prisma from "./lib/prisma";

//https://clerk.com/docs/backend-requests/handling/nodejs
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

export const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://team-sync-rho.vercel.app"
        : "http://localhost:3000",
  })
);

app.post(
  "/api/signUpUser",
  // Parse raw JSON payloads
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers and body
    const headers = req.headers;
    const payload = req.body as Buffer | string;

    // Get Svix headers for verification
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Error: Missing svix headers",
      });
    }

    let evt: WebhookEvent | null = null; // Initialize with an empty object

    // Attempt to verify the incoming webhook
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id as string,
        "svix-timestamp": svix_timestamp as string,
        "svix-signature": svix_signature as string,
      }) as WebhookEvent;
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error: Could not verify webhook:", err.message);
        return void res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }

    // Do something with payload
    // For this guide, log payload to console
    if (evt) {
      const {
        id,
        type: eventType,
        email_addresses,
        username,
        has_image,
        image_url,
      } = evt.data; // Now TypeScript knows the structure
      console.log(
        `Received webhook with ID ${id} and event type of ${eventType}`
      );
      console.log("Webhook payload:", evt.data);

      const newUser = await prisma.user.create({
        data: {
          id: id,
          email: email_addresses[0].email_address,
          username: username,
          hasImage: has_image,
          imageUrl: image_url,
        },
      });

      console.log(newUser);

      return res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } else {
      // If evt is null (in case of an error)
      console.log("Error: Webhook verification failed");
      return res.status(400).json({
        success: false,
        message: "Error: Webhook verification failed",
      });
    }
  }
);

app.use(express.json());

configRoutes(app);

const PORT = 3001;

const httpServer = app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);

//socketio for real time chat

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://team-sync-rho.vercel.app"
        : "http://localhost:3000",
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
    console.log("user id" + userId);
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
    socket.to(guildId).emit(`updateGuild ${guildId}`);
    console.log(`New User Joined guild: ${guildId}`);
  });

  socket.on("leaveGuild", async (guildId: string) => {
    await socket.leave(guildId);
    socket.to(guildId).emit(`updateGuild ${guildId}`);
    console.log("User left guild");
  });

  socket.on("deleteGuild", async (guildId: string) => {
    await socket.leave(guildId);
    socket.to(guildId).emit("refresh");
  });

  socket.on(
    "joinVoiceChannel",
    ({
      guildId,
      channelId,
      username,
    }: {
      guildId: string;
      channelId: string;
      username: string;
    }) => {
      console.log(`Current user joined voice channel: ${channelId}`);
      socket.to(guildId).emit("joinVoiceChannel", channelId, username);
    }
  );

  socket.on(
    "leaveVoiceChannel",
    ({
      guildId,
      channelId,
      username,
    }: {
      guildId: string;
      channelId: string;
      username: string;
    }) => {
      console.log(`Current user left voice channel: ${channelId}`);
      socket.to(guildId).emit("leaveVoiceChannel", channelId, username);
    }
  );

  socket.on(
    "muteVoiceChannel",
    ({
      guildId,
      channelId,
      username,
      isMuted,
    }: {
      guildId: string;
      channelId: string;
      username: string;
      isMuted: boolean;
    }) => {
      console.log(`Current user muted voice channel: ${channelId}`);
      socket.to(guildId).emit("muteVoiceChannel", channelId, username, isMuted);
    }
  );

  //these below are probably not needed anymore
  // socket.on("createNewChannel", async (channelId: string, guildId: string) => {
  //   console.log(`Current user joined new channel: ${channelId}`);
  //   await socket.join(channelId);
  //   socket.to(guildId).emit(`newChannel`, channelId);
  // });

  // socket.on("joinChannel", async (channelId: string) => {
  //   await socket.join(channelId);
  //   console.log("joinedChannel");
  //   socket.emit("refresh");
  // });

  socket.on("deleteChannel", async (channelId: string) => {
    io.to(channelId).emit(`deleteChannel ${channelId}`, channelId);
    io.to(channelId).emit("refresh");
    await socket.leave(channelId);
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
    socket.to(conversationId).emit(`message ${conversationId}`, data);
  });

  socket.on("editMessage", (data: Message) => {
    const { conversationId } = data;
    io.to(conversationId).emit(`editMessage ${conversationId}`, data);
  });

  socket.on("notification", (data: Message) => {
    const { conversationId } = data;
    console.log(data);
    socket.to(conversationId).emit(`notification`, data);
    socket.to(conversationId).emit(`unread`, data);
  });

  socket.on("newVoiceCall", (conversationId: string, imageUrl: string) => {
    socket
      .to(conversationId)
      .emit(`incomingVoiceCall`, conversationId, imageUrl);

    socket.to(conversationId).emit(`checkRoomEmpty ${conversationId}`, false);
  });

  socket.on("joinVoiceCall", (conversationId: string) => {
    socket.to(conversationId).emit(`joinVoiceCall`, conversationId);
  });

  socket.on("leaveVoiceCall", (conversationId: string) => {
    socket.to(conversationId).emit(`leaveVoiceCall`, conversationId);
  });

  socket.on("checkRoomEmpty", async (conversationId: string) => {
    try {
      const rooms = await roomService.listRooms();
      const room = rooms.find((room) => room.name === conversationId);

      let isEmpty;

      if (!room) {
        isEmpty = true;
        io.to(conversationId).emit(`checkRoomEmpty ${conversationId}`, isEmpty);
        return;
      }

      const result = await roomService.listParticipants(conversationId);

      if (result.length === 0) {
        isEmpty = true;
      } else {
        isEmpty = false;
      }

      io.to(conversationId).emit(`checkRoomEmpty ${conversationId}`, isEmpty);
    } catch (error) {
      console.log("Error checking room empty:", error);
    }
  });

  socket.on("channelMessage", (data: ChannelMessage) => {
    const { channelId } = data;
    console.log(channelId);
    socket.to(channelId).emit(`channelMessage ${channelId}`, data);
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
