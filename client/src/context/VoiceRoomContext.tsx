"use client";

import { Room, RoomEvent } from "livekit-client";
import { TextChannel } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useGuild } from "./GuildContext";
import { useUser } from "@clerk/nextjs";
import { useIsSpeaking } from "@livekit/components-react";
import { useParticipants } from "@livekit/components-react";

interface VoiceRoomContextProps {
  room: Room | null;
  currentChannel: TextChannel | null;
  currentGuild: string;
  connect: (token: string, channel: TextChannel, guildName: string) => void;
  disconnect: () => void;
  isConnected: boolean;
  token: string;
}

const VoiceRoomContext = createContext<VoiceRoomContextProps | undefined>(
  undefined
);

export const VoiceRoomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<TextChannel | null>(
    null
  );
  const [token, setToken] = useState<string>("");
  const [currentGuild, setCurrentGuild] = useState<string>("");
  const {
    addParticipant,
    removeParticipant,
    activeVoiceChannels,
    updateActiveSpeakers,
    updateNoSpeakers,
  } = useGuild();
  const { user } = useUser();

  useEffect(() => {
    console.log("Test");
    room?.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
      if (speakers.length === 0) {
        updateNoSpeakers(currentChannel?.id as string);
      }

      speakers.forEach((speaker) => {
        updateActiveSpeakers(
          currentChannel?.id as string,
          speaker.identity,
          speaker.isSpeaking
        );
      });
    });
  }, [
    room,
    activeVoiceChannels,
    currentChannel,
    updateActiveSpeakers,
    updateNoSpeakers,
  ]);

  const connect = async (
    token: string,
    channel: TextChannel,
    guildName: string
  ) => {
    if (room && isConnected) {
      if (room.name === channel.id) {
        return;
      }

      removeParticipant(currentChannel?.id as string, user?.username as string);
      await room.disconnect();
    }

    setToken(token);
    setCurrentChannel(channel);
    setCurrentGuild(guildName);

    const newRoom = new Room();

    setIsConnected(true);

    newRoom.on(RoomEvent.Disconnected, () => {
      setIsConnected(false);
    });

    setRoom(newRoom);
    addParticipant(channel.id, user?.username as string);

    // try {
    //   // Connect to new room
    //   await newRoom.connect(serverUrl, token, {
    //     // Add any room options you need
    //   });
    // } catch (error) {
    //   console.error("Failed to connect to room:", error);
    // }
  };

  const disconnect = () => {
    room?.disconnect();
    setIsConnected(false);
    removeParticipant(currentChannel?.id as string, user?.username as string);
  };

  const value = {
    room,
    currentChannel,
    currentGuild,
    connect,
    disconnect,
    isConnected,
    token,
  };

  return (
    <VoiceRoomContext.Provider value={value}>
      {children}
    </VoiceRoomContext.Provider>
  );
};

export const useVoiceRoom = () => {
  const context = useContext(VoiceRoomContext);

  if (!context) {
    throw new Error("useVoiceRoom must be used within a VoiceRoomProvider");
  }

  return context;
};
