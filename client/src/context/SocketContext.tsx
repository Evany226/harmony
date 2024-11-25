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
import { useGuild } from "./GuildContext";
import { useVoiceRoom } from "./VoiceRoomContext";
import useSound from "use-sound";

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
  const { createAlert, isVoiceCallOpen } = useNotification();
  const { addParticipant, removeParticipant, updateMuteStatus } = useGuild();
  const { isConnected: isVoiceChannelOpen, room } = useVoiceRoom();
  const router = useRouter();
  const [playLeaveSound] = useSound("/audio/leave-call.mp3");
  const [playJoinSound] = useSound("/audio/join-call.mp3");

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

    socket.on(`newChannel`, (channelId: string) => {
      socket.emit("joinChannel", channelId);
      console.log("once");
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
        console.log("incoming call");
        createAlert("Incoming call", conversationId, imageUrl);
      }
    );

    socket.on("leaveVoiceCall", () => {
      if (isVoiceCallOpen) {
        console.log("other user left");
        playLeaveSound();
      }
    });

    socket.on("joinVoiceCall", () => {
      if (isVoiceCallOpen) {
        console.log("other user joined");
        playJoinSound();
      }
    });

    const socketAddParticipant = (channelId: string, username: string) => {
      addParticipant(channelId, username);

      if (isVoiceChannelOpen && room && room.name === channelId) {
        playJoinSound();
      }
    };

    socket.on("joinVoiceChannel", socketAddParticipant);

    const socketRemoveParticipant = (channelId: string, username: string) => {
      removeParticipant(channelId, username);

      if (isVoiceChannelOpen && room && room.name === channelId) {
        playLeaveSound();
      }
    };

    socket.on("leaveVoiceChannel", socketRemoveParticipant);

    const socketMuteVoiceChannel = (
      channelId: string,
      username: string,
      isMuted: boolean
    ) => {
      updateMuteStatus(channelId, username, isMuted);
    };

    socket.on("muteVoiceChannel", socketMuteVoiceChannel);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");
      socket.off("onlineUsers");
      socket.off("refresh");
      socket.off("incomingVoiceCall");
      socket.off("leaveVoiceCall");
      socket.off("joinVoiceCall");
      socket.off("joinVoiceChannel");
      socket.off("leaveVoiceChannel");
      socket.off("muteVoiceChannel");
    };
  }, [
    createAlert,
    getToken,
    toast,
    userId,
    router,
    user,
    playLeaveSound,
    playJoinSound,
    isVoiceCallOpen,
    addParticipant,
    removeParticipant,
    isVoiceChannelOpen,
    room,
    updateMuteStatus,
  ]);

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
