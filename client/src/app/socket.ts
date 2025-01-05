"use client";

import { io } from "socket.io-client";
import { url } from "@/lib/utils";

// const serverUrl = "https://www.harmony-api.me/";
const serverUrl = "http://localhost:3001";

export const socket = io(serverUrl, {
  reconnection: false,
  autoConnect: false,
});

// import { useEffect, useState, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import { useAuth } from "@clerk/nextjs";

// const serverUrl = "http://localhost:3001";

// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }

// export type SocketType = Socket<
//   ServerToClientEvents,
//   ClientToServerEvents
// > | null;

// export const useSocket = ({ conversationId }: { conversationId: string }) => {
//   const [socket, setSocket] = useState<SocketType>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const { getToken } = useAuth();
//   const socketRef = useRef<SocketType>(null);

//   useEffect(() => {
//     const initializeSocket = async () => {

//       const token = await getToken();
//       return token;
//     }

//     const token = initializeSocket();

//     const newSocket = io(serverUrl, {
//       extraHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//       // reconnection: true,
//       // reconnectionAttempts: 5,
//       // reconnectionDelay: 1000,
//     });

//       const onConnect = () => {
//         setIsConnected(true);
//       };

//       const onDisconnect = () => {
//         setIsConnected(false);
//       };

//       newSocket.on("connect", onConnect);
//       newSocket.on("disconnect", onDisconnect);
//       newSocket.emit("joinRoom", conversationId);

//       socketRef.current = newSocket;
//       setSocket(newSocket);

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off("connect");
//         socketRef.current.off("disconnect");
//       }
//     };
//   }, [getToken, conversationId]);

//   return { socket, isConnected };
// };
