"use client";

import { createContext, useContext, useCallback } from "react";

import { useState, useEffect } from "react";
import { Member, RoomParticipant } from "@/types";

interface GuildMemberContextProps {
  guildMembers: Member[];
  updateGuildMembers: (members: Member[]) => void;
  setParticipants: (participants: any) => void;
  roomParticipants: RoomParticipant[];
  addParticipant: (channelId: string, username: string) => void;
  removeParticipant: (channelId: string, username: string) => void;
}

const GuildMemberContext = createContext<GuildMemberContextProps | undefined>(
  undefined
);

export const GuildMemberProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [guildMembers, setGuildMembers] = useState<Member[]>([]);
  const [roomParticipants, setRoomParticipants] = useState<RoomParticipant[]>(
    []
  );

  const setParticipants = useCallback((participants: RoomParticipant[]) => {
    setRoomParticipants(participants);
    console.log(participants);
  }, []);

  const addParticipant = (channelId: string, username: string) => {
    const participants = roomParticipants.map(
      (participant: RoomParticipant) => {
        if (participant.channelId === channelId) {
          return {
            channelId,
            participants: [...participant.participants, username],
          };
        }
        return participant;
      }
    );

    console.log(participants);

    setRoomParticipants(participants);
    return participants;
  };

  const removeParticipant = (channelId: string, username: string) => {
    const participants = roomParticipants.map(
      (participant: RoomParticipant) => {
        if (participant.channelId === channelId) {
          return {
            channelId,
            participants: participant.participants.filter(
              (participant) => participant !== username
            ),
          };
        }
        return participant;
      }
    );

    console.log(participants);

    setRoomParticipants(participants);
    return participants;
  };

  const updateGuildMembers = useCallback((members: Member[]) => {
    setGuildMembers(members);
  }, []);

  return (
    <GuildMemberContext.Provider
      value={{
        guildMembers,
        updateGuildMembers,
        setParticipants,
        roomParticipants,
        addParticipant,
        removeParticipant,
      }}
    >
      {children}
    </GuildMemberContext.Provider>
  );
};

export const useGuildMember = () => {
  const context = useContext(GuildMemberContext);

  if (context === undefined) {
    throw new Error("useGuildMember must be used within a GuildMemberProvider");
  }

  return context;
};
