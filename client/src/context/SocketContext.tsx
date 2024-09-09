"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/app/socket";
import { getAllConversations } from "@/lib/conversations";
import { useAuth } from "@clerk/nextjs";
import { Conversation, Message } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { formatTimestamp } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SocketContextProps {
  socket: typeof socket;
  isConnected: boolean;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();

    const fetchConversations = async () => {
      const token = await getToken();
      const data = await getAllConversations(token as string);
      const ids = data.map((conversation: Conversation) => conversation.id);
      console.log(ids);
      socket.emit("joinRoom", ids);
    };

    fetchConversations();

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("joinOnline", userId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("notification", (data: Message) => {
      const { content, sender } = data;
      console.log("notification received");
      toast({
        title: `${sender.username}`,
        description: `${content}`,
        image: sender.imageUrl,
        createdAt: `${formatTimestamp(data.createdAt)}`,
      });
    });

    socket.on("joinConversation", () => {
      router.refresh();
    });

    socket.on("onlineUsers", (data: string[]) => {
      // toast({
      //   title: "online users",
      //   description: `${data}`,
      // });
      setOnlineUsers(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");
      socket.off("onlineUsers");
    };
  }, [getToken, toast, userId, router]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
