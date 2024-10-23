"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/app/socket";
import { getAllConversations } from "@/lib/conversations";
import { useAuth } from "@clerk/nextjs";
import { Conversation, Message } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { formatTimestamp } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getUserChannelIds, getUserGuildIds } from "@/lib/guilds";
import { useUser } from "@clerk/nextjs";
import { useNotification } from "./NotificationContext";

interface SocketContextProps {
  socket: typeof socket;
  isConnected: boolean;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const { createAlert } = useNotification();
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();

    const fetchConversations = async () => {
      const token = await getToken();
      const data = await getAllConversations(token as string);
      const ids = data.map((conversation: Conversation) => conversation.id);

      const channelIds = await getUserChannelIds(token as string);

      const guildIds = await getUserGuildIds(token as string);
      console.log(guildIds);

      socket.emit("joinRoom", ids);
      socket.emit("joinRoom", channelIds);
      socket.emit("joinRoom", guildIds);
    };

    if (user) {
      fetchConversations();
    }

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("joinOnline", userId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("notification", (data: Message) => {
      const { content, sender } = data;

      const senderUser = sender.user;
      console.log("notification received");
      toast({
        title: `${senderUser.username}`,
        description: `${content}`,
        image: senderUser.imageUrl,
        createdAt: `${formatTimestamp(data.createdAt)}`,
      });
    });

    socket.on("newChannel", (channelId: string) => {
      socket.emit("joinChannel", channelId);
    });

    socket.on("refresh", () => {
      //revalidates the other clients when a new conversation is created
      console.log("refreshed");
      router.refresh();
    });

    socket.on("onlineUsers", (data: string[]) => {
      setOnlineUsers(data);
      router.refresh();
    });

    socket.on(
      "incomingVoiceCall",
      (conversationId: string, imageUrl: string) => {
        createAlert("John Doe", conversationId, imageUrl);
      }
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");
      socket.off("onlineUsers");
      socket.off("refresh");
      socket.off("incomingVoiceCall");
    };
  }, [createAlert, getToken, toast, userId, router, user]);

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
