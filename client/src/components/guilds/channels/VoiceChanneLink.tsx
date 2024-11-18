"use client";

import { TextChannel } from "@/types";
import { usePathname } from "next/navigation";

import { Cog8ToothIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useVoiceChannel } from "@/context/VoiceChannelContext";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useGuildMember } from "@/context/GuildMemberContext";

import EditChannelDialog from "./EditChannelDialog";

interface VoiceChannelLinkProps {
  channel: TextChannel;
  href: string;
  guildId: string;
  guildName: string;
}

export default function VoiceChannelLink({
  channel,
  href,
  guildId,
  guildName,
}: VoiceChannelLinkProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const userName = user?.username;
  const {
    joinVoiceChannel,
    isVoiceChannelOpen,
    leaveVoiceChannel,
    currentRoom,
  } = useVoiceChannel();

  const { roomParticipants, addParticipant, removeParticipant } =
    useGuildMember();

  const handleJoinChannel = async () => {
    console.log(isVoiceChannelOpen);
    if (isVoiceChannelOpen) {
      return;
    }

    joinVoiceChannel(channel.id, channel.name, guildName);
    addParticipant(channel.id, userName as string);
  };

  const channelParticipants = roomParticipants.find((participant) => {
    return participant.channelId === channel.id;
  });

  if (!channelParticipants) {
    return [];
  }

  return (
    <>
      <div
        className={`group py-1 rounded-sm flex items-center justify-between px-1 cursor-pointer ${
          pathname == href ? "bg-zinc-700" : "hover:bg-neutral-800"
        }`}
        onClick={handleJoinChannel}
      >
        <div className="flex items-center w-full ">
          <SpeakerWaveIcon className="w-4 text-gray-300" />
          <p className={`text-sm font-medium ml-1 text-gray-300`}>
            {channel.name}
          </p>
        </div>

        <div className="hidden group-hover:block">
          <div className="flex items-center">
            <EditChannelDialog
              name={channel.name}
              id={channel.id}
              guildId={guildId}
            >
              <Cog8ToothIcon className="w-4 text-gray-400 hover:text-white" />
            </EditChannelDialog>
          </div>
        </div>
      </div>
      {channelParticipants.participants.map((participant, index) => {
        return (
          <section
            key={index}
            className=" ml-6 mr-2 my-1 flex items-center p-1 rounded-sm cursor-pointer hover:bg-neutral-800"
          >
            <Avatar className="w-7 h-7">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>EY</AvatarFallback>
            </Avatar>
            <p className="text-gray-300 ml-2 font-medium">{participant}</p>
          </section>
        );
      })}
    </>
  );
}
