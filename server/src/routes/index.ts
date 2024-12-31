import friendRouter from "./friendRoute";
import friendReqRouter from "./friendReqRoute";
import convRouter from "./convRoute";
import convMsgRouter from "./convMsgRoute";
import guildRouter from "./guildRoute";
import categoryRouter from "./categoryRoute";
import channelRouter from "./channelRoute.ts";
import memberRouter from "./memberRoute";
import guildReqRouter from "./guildReqRoute";
import guildMsgRouter from "./guildMsgRoute";
import userRouter from "./userRoute";
import unreadMsgRouter from "./unreadMsgRoute";
import liveKitRouter from "./livekitRoute";
import { Express } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const constructorMethod = (app: Express) => {
  app.get("/", (req, res) => {
    // Your route handler logic
    res.json("app is running");
  });

  app.use("/api/friends", ClerkExpressRequireAuth({}), friendRouter);
  app.use("/api/requests", ClerkExpressRequireAuth({}), friendReqRouter);
  app.use("/api/conversations", ClerkExpressRequireAuth({}), convRouter);
  app.use("/api/messages", ClerkExpressRequireAuth({}), convMsgRouter);
  app.use("/api/guilds", ClerkExpressRequireAuth({}), guildRouter);
  app.use("/api/categories", ClerkExpressRequireAuth({}), categoryRouter);
  app.use("/api/channels", ClerkExpressRequireAuth({}), channelRouter);
  app.use("/api/members", ClerkExpressRequireAuth({}), memberRouter);
  app.use("/api/guild-requests", ClerkExpressRequireAuth({}), guildReqRouter);
  app.use("/api/guild-messages", ClerkExpressRequireAuth({}), guildMsgRouter);
  app.use("/api/users", ClerkExpressRequireAuth({}), userRouter);
  app.use("/api/unread", ClerkExpressRequireAuth({}), unreadMsgRouter);
  app.use("/api/livekit", ClerkExpressRequireAuth({}), liveKitRouter);
};

export default constructorMethod;
