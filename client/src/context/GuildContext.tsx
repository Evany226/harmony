"use client";

import { createContext, useContext, useCallback } from "react";

import { useState, useEffect } from "react";
import { Member, ActiveVoiceChannel } from "@/types";

interface GuildContextProps {
  guildMembers: Member[];
  updateGuildMembers: (members: Member[]) => void;
  updateActiveVoiceChannels: (
    voiceChannels: ActiveVoiceChannel[],
    members: Member[]
  ) => void;
  activeVoiceChannels: ActiveVoiceChannel[];
  addParticipant: (channelId: string, username: string) => void;
  removeParticipant: (channelId: string, username: string) => void;
  updateActiveSpeakers: (
    currentChannelId: string,
    speakerName: string,
    isSpeaking: boolean
  ) => void;
  updateNoSpeakers: (currentChannelId: string) => void;
}

const GuildContext = createContext<GuildContextProps | undefined>(undefined);

export const GuildProvider = ({ children }: { children: React.ReactNode }) => {
  const [guildMembers, setGuildMembers] = useState<Member[]>([]);
  const [activeVoiceChannels, setActiveVoiceChannels] = useState<
    ActiveVoiceChannel[]
  >([]);

  const getImageUrl = useCallback((username: string, members: Member[]) => {
    const member = members.find((member) => member.user.username === username);
    console.log(member);

    if (member) {
      return member.user.imageUrl;
    }

    return "";
  }, []);

  const updateNoSpeakers = (currentChannelId: string) => {
    setActiveVoiceChannels((prevVoiceChannels: ActiveVoiceChannel[]) => {
      const room = prevVoiceChannels.find(
        (channel) => channel.channelId === currentChannelId
      );

      if (!room) {
        return prevVoiceChannels;
      }

      const updatedParticipants = room.participants.map((participant) => ({
        ...participant,
        isSpeaking: false,
      }));

      const updatedChannels = prevVoiceChannels.map((voiceChannel) =>
        voiceChannel.channelId === currentChannelId
          ? { ...voiceChannel, participants: updatedParticipants }
          : voiceChannel
      );

      return updatedChannels;
    });
  };

  const updateActiveSpeakers = (
    currentChannelId: string,
    speakerName: string,
    isSpeaking: boolean
  ) => {
    setActiveVoiceChannels((prevVoiceChannels: ActiveVoiceChannel[]) => {
      const room = prevVoiceChannels.find(
        (channel) => channel.channelId === currentChannelId
      );

      if (!room) {
        return prevVoiceChannels;
      }
      const updatedParticipants = room.participants.map(
        (participant) =>
          participant.username === speakerName
            ? { ...participant, isSpeaking } // Update the matching speaker
            : { ...participant, isSpeaking: false } // Set others to false
      );

      const updatedChannels = prevVoiceChannels.map((voiceChannel) =>
        voiceChannel.channelId === currentChannelId
          ? { ...voiceChannel, participants: updatedParticipants }
          : voiceChannel
      );

      console.log(updatedChannels);

      return updatedChannels;
    });
  };

  const updateActiveVoiceChannels = useCallback(
    (voiceChannels: ActiveVoiceChannel[], members: Member[]) => {
      console.log(voiceChannels);
      const updatedChannels = voiceChannels.map((voiceChannel) => {
        const participants = voiceChannel.participants;

        const newParticipants = participants.map((participant) => {
          const imageUrl = getImageUrl(participant.username, members);
          if (imageUrl) {
            return {
              ...participant,
              imageUrl: imageUrl,
              isSpeaking: false,
            };
          } else {
            return participant;
          }
        });

        return { ...voiceChannel, participants: newParticipants };
      });

      setActiveVoiceChannels(updatedChannels);
    },
    [getImageUrl]
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
            participants: [
              ...currentParticipants,
              {
                username: username,
                imageUrl: getImageUrl(username, guildMembers),
              },
            ],
          };
        }

        console.log(updatedParticipants);

        return updatedParticipants;
      } else {
        // Add new channel entry
        return [
          ...prevVoiceChannels,
          {
            channelId,
            participants: [
              {
                username: username,
                imageUrl: getImageUrl(username, guildMembers),
              },
            ],
          },
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
        updateActiveSpeakers,
        updateNoSpeakers,
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
