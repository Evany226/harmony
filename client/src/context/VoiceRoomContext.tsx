"use client";

import { Room, RoomEvent } from "livekit-client";
import { TextChannel } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useGuild } from "./GuildContext";
import { useUser } from "@clerk/nextjs";
import { useVoiceCall } from "./VoiceCallContext";
import { socket } from "@/app/socket";
import { useAudio } from "./AudioContext";
import { checkUserInRoom } from "@/lib/conversations";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";

interface VoiceRoomContextProps {
  room: Room | null;
  currentChannel: TextChannel | null;
  currentGuild: string;
  currentGuildId: string;
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

  const { playJoinSound, playLeaveSound } = useAudio();

  const { isVoiceCallOpen, setIsVoiceCallOpen } = useVoiceCall();
  const { getToken } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
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
    console.log("Connecting to room", channel.id);

    if (isVoiceCallOpen) {
      setIsVoiceCallOpen(false);
    }

    if (room && isConnected) {
      if (room.name === channel.id) {
        console.log("Room name:", room.name);
        return;
      }

      try {
        setIsConnected(false);
        removeParticipant(
          currentChannel?.id as string,
          user?.username as string
        );
        await room.disconnect();

        socket.emit("leaveVoiceChannel", {
          guildId: currentGuildId,
          channelId: currentChannel?.id,
          username: user?.username,
        });
      } catch (error) {
        console.error("Error disconnecting from room", error);
      }
    }

    const authToken = await getToken();

    const isUserInRoom = await checkUserInRoom(
      authToken as string,
      channel.id,
      user?.username as string
    );

    if (isUserInRoom) {
      toast({
        variant: "destructive",
        title: "Already in room",
        description: "Current user already in a room",
      });
      return;
    }

    setToken(token);
    setCurrentChannel(channel);
    setCurrentGuild(guildName);
    setCurrentGuildId(guildId);

    const newRoom = new Room();

    setRoom(newRoom);

    setIsConnected(true);
    playJoinSound();
    addParticipant(channel.id, user?.username as string);

    socket.emit("joinVoiceChannel", {
      guildId: guildId,
      channelId: channel.id,
      username: user?.username,
    });
  };

  const disconnect = () => {
    if (room) {
      room?.disconnect();
      setIsConnected(false);
      playLeaveSound();
      removeParticipant(currentChannel?.id as string, user?.username as string);

      socket.emit("leaveVoiceChannel", {
        guildId: currentGuildId,
        channelId: currentChannel?.id,
        username: user?.username,
      });
    }
  };

  const value = {
    room,
    currentChannel,
    currentGuild,
    currentGuildId,
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
