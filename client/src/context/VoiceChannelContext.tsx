"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useNotification } from "./NotificationContext";
import { getLiveKitToken } from "@/lib/conversations";
import { socket } from "@/app/socket";

const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

interface VoiceChannelContextProps {
  token: string;
  setToken: (value: string) => void;
  isVoiceChannelOpen: boolean;
  setIsVoiceChannelOpen: (value: boolean) => void;
  joinVoiceChannel: (
    channelId: string,
    channelName: string,
    guildName: string
  ) => void;
  leaveVoiceChannel: () => void;
  currentChannel: string;
  currentGuild: string;
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
  const [currentChannel, setCurrentChannel] = useState<string>("");
  const [currentGuild, setCurrentGuild] = useState<string>("");

  const { user } = useUser();
  const { isVoiceCallOpen, setIsVoiceCallOpen } = useNotification();
  const userName = user?.username;

  const joinVoiceChannel = async (
    channelId: string,
    channelName: string,
    guildName: string
  ) => {
    if (isVoiceCallOpen) {
      setIsVoiceCallOpen(false);
    }

    setCurrentChannel(channelName);
    setCurrentGuild(guildName);

    setCurrentRoom(channelId);
    setIsVoiceChannelOpen(true);

    try {
      const roomName = channelId;
      const token = await getLiveKitToken(roomName, userName as string);
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
        leaveVoiceChannel,
        currentChannel,
        currentGuild,
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
