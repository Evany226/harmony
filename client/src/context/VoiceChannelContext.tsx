"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useNotification } from "./NotificationContext";
import { getLiveKitToken } from "@/lib/conversations";

const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

interface VoiceChannelContextProps {
  token: string;
  setToken: (value: string) => void;
  isVoiceChannelOpen: boolean;
  setIsVoiceChannelOpen: (value: boolean) => void;
  joinVoiceChannel: (channelId: string, username: string) => void;
  currentRoom: string;
}

const VoiceChannelContext = createContext<VoiceChannelContextProps | undefined>(
  undefined
);

export const VoiceChannelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState("");
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [isVoiceChannelOpen, setIsVoiceChannelOpen] = useState<boolean>(false);

  const { user } = useUser();
  const { isVoiceCallOpen, setIsVoiceCallOpen } = useNotification();
  const userName = user?.username;

  const joinVoiceChannel = async (channelId: string, username: string) => {
    if (isVoiceCallOpen) {
      setIsVoiceCallOpen(false);
    }

    if (isVoiceChannelOpen) {
      setCurrentRoom(channelId);
      return;
    }

    setCurrentRoom(channelId);
    setIsVoiceChannelOpen(true);

    try {
      const roomName = channelId;
      const token = await getLiveKitToken(roomName, userName as string);
      console.log(token);
      setToken(token);
    } catch (e) {
      console.error(e);
    }
  };

  const leaveVoiceChannel = () => {
    setCurrentRoom("");
    setIsVoiceChannelOpen(false);
  };

  return (
    <VoiceChannelContext.Provider
      value={{
        token,
        setToken,
        isVoiceChannelOpen,
        setIsVoiceChannelOpen,
        joinVoiceChannel,
        currentRoom,
      }}
    >
      {children}
    </VoiceChannelContext.Provider>
  );
};

export const useVoiceChannel = () => {
  const context = useContext(VoiceChannelContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
