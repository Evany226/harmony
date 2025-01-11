"use client";

import { io } from "socket.io-client";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.harmony-api.me/"
    : "http://localhost:3001";

export const socket = io(serverUrl, {
  reconnection: false,
  autoConnect: false,
});
