"use client";

import { Room, RoomEvent } from "livekit-client";
import { TextChannel } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useGuild } from "./GuildContext";
import { useUser } from "@clerk/nextjs";
import { useNotification } from "./NotificationContext";
import { socket } from "@/app/socket";
import useSound from "use-sound";

interface VoiceRoomContextProps {
  room: Room | null;
  currentChannel: TextChannel | null;
  currentGuild: string;
  connect: (
    token: string,
    channel: TextChannel,
    guildName: string,
    guildId: string
  ) => void;
  disconnect: () => void;
  isConnected: boolean;
  token: string;
}

const VoiceRoomContext = createContext<VoiceRoomContextProps | undefined>(
  undefined
);

const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

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
  const [currentGuildId, setCurrentGuildId] = useState<string>("");
  const {
    addParticipant,
    removeParticipant,
    activeVoiceChannels,
    updateActiveSpeakers,
    updateNoSpeakers,
  } = useGuild();
  const { user } = useUser();

  const [playJoinSound] = useSound("/audio/join-call.mp3");
  const [playLeaveSound] = useSound("/audio/leave-call.mp3");

  const { isVoiceCallOpen, setIsVoiceCallOpen } = useNotification();

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
    guildName: string,
    guildId: string
  ) => {
    if (isVoiceCallOpen) {
      setIsVoiceCallOpen(false);
    }

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
    setCurrentGuildId(guildId);

    const newRoom = new Room();

    setIsConnected(true);

    newRoom.on(RoomEvent.Disconnected, () => {
      setIsConnected(false);
    });

    setRoom(newRoom);
    playJoinSound();
    addParticipant(channel.id, user?.username as string);

    socket.emit("joinVoiceChannel", {
      guildId: guildId,
      channelId: channel.id,
      username: user?.username,
    });

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
    playLeaveSound();
    removeParticipant(currentChannel?.id as string, user?.username as string);

    socket.emit("leaveVoiceChannel", {
      guildId: currentGuildId,
      channelId: currentChannel?.id,
      username: user?.username,
    });
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
