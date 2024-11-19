"use client";

import { createContext, useContext, useCallback } from "react";

import { useState, useEffect } from "react";
import { Member, ActiveVoiceChannel } from "@/types";

interface GuildContextProps {
  guildMembers: Member[];
  updateGuildMembers: (members: Member[]) => void;
  updateActiveVoiceChannels: (participants: any) => void;
  activeVoiceChannels: ActiveVoiceChannel[];
  addParticipant: (channelId: string, username: string) => void;
  removeParticipant: (channelId: string, username: string) => void;
}

const GuildContext = createContext<GuildContextProps | undefined>(undefined);

export const GuildProvider = ({ children }: { children: React.ReactNode }) => {
  const [guildMembers, setGuildMembers] = useState<Member[]>([]);
  const [activeVoiceChannels, setActiveVoiceChannels] = useState<
    ActiveVoiceChannel[]
  >([]);

  const updateActiveVoiceChannels = useCallback(
    (voiceChannels: ActiveVoiceChannel[]) => {
      setActiveVoiceChannels(voiceChannels);
      console.log(voiceChannels);
    },
    []
  );

  const addParticipant = (channelId: string, username: string) => {
    setActiveVoiceChannels((prevVoiceChannels) => {
      // Check if channel already exists
      const existingChannelIndex = prevVoiceChannels.findIndex(
        (p) => p.channelId === channelId
      );

      if (existingChannelIndex !== -1) {
        // Update existing channel
        const updatedParticipants = [...prevVoiceChannels];
        const currentParticipants =
          updatedParticipants[existingChannelIndex].participants;

        // Only add if not already in participants

        const existingParticipant = currentParticipants.find(
          (p) => p.username === username
        );

        if (!existingParticipant) {
          updatedParticipants[existingChannelIndex] = {
            ...updatedParticipants[existingChannelIndex],
            participants: [...currentParticipants, { username: username }],
          };
        }

        console.log(updatedParticipants);

        return updatedParticipants;
      } else {
        // Add new channel entry
        return [
          ...prevVoiceChannels,
          { channelId, participants: [{ username: username }] },
        ];
      }
    });
  };

  const removeParticipant = (channelId: string, username: string) => {
    const participants = activeVoiceChannels.map(
      (voiceChannel: ActiveVoiceChannel) => {
        if (voiceChannel.channelId === channelId) {
          return {
            channelId,
            participants: voiceChannel.participants.filter(
              (participant) => participant.username !== username
            ),
          };
        }
        return voiceChannel;
      }
    );

    console.log(participants);

    setActiveVoiceChannels(participants);
    return participants;
  };

  const updateGuildMembers = useCallback((members: Member[]) => {
    setGuildMembers(members);
  }, []);

  return (
    <GuildContext.Provider
      value={{
        guildMembers,
        updateGuildMembers,
        updateActiveVoiceChannels,
        activeVoiceChannels,
        addParticipant,
        removeParticipant,
      }}
    >
      {children}
    </GuildContext.Provider>
  );
};

export const useGuild = () => {
  const context = useContext(GuildContext);

  if (context === undefined) {
    throw new Error("useGuildMember must be used within a GuildMemberProvider");
  }

  return context;
};
