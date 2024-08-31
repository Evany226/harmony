"use client";

import { io } from "socket.io-client";

const serverUrl = "http://localhost:3001";

export const socket = io(serverUrl);
