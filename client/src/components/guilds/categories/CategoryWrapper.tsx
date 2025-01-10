"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Image from "next/image";
import { MutedMicIcon } from "@/assets/MicIcon";

import CategoryContextMenu from "./CategoryContextMenu";

import {
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import CreateChannelDialog from "../channels/CreateChannelDialog";
import { useState } from "react";

import { ActiveVoiceChannel, TextChannel } from "@/types";
import ChannelLink from "../channels/ChannelLink";
import VoiceChannelLink from "../channels/VoiceChanneLink";
import { getLiveKitToken, checkUserInRoom } from "@/lib/conversations";
import { useGuild } from "@/context/GuildContext";
import { useUser } from "@clerk/nextjs";
import { useVoiceRoom } from "@/context/VoiceRoomContext";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";

interface CategoryWrapperProps {
  name: string;
  channels: TextChannel[];
  guildId: string;
  guildName: string;
  categoryId: string;
}

export default function CategoryWrapper({
  name,
  channels,
  guildId,
  guildName,
  categoryId,
}: CategoryWrapperProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { user } = useUser();
  const { connect } = useVoiceRoom();
  const { toast } = useToast();
  const { getToken } = useAuth();

  const { activeVoiceChannels } = useGuild();

  const handleJoinChannel = async (channel: TextChannel) => {
    const authToken = await getToken();
    const token = await getLiveKitToken(
      authToken as string,
      channel.id,
      user?.username as string
    );

    connect(token, channel, guildName, guildId);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-between items-center mt-3">
        <CategoryContextMenu
          name={name}
          categoryId={categoryId}
          guildId={guildId}
        >
          <CollapsibleTrigger onClick={(e) => e.stopPropagation()} asChild>
            <main className="flex items-center space-x-1 cursor-pointer">
              {isOpen ? (
                <ChevronRightIcon className="w-3 text-gray-300 cursor-pointer font-bold" />
              ) : (
                <ChevronDownIcon className="w-3 text-gray-300 cursor-pointer font-bold" />
              )}
              <p className="text-sm text-gray-300 font-medium hover:text-white">
                {name}
              </p>
            </main>
          </CollapsibleTrigger>
        </CategoryContextMenu>

        <CreateChannelDialog categoryId={categoryId} guildId={guildId}>
          <PlusIcon className="w-4 text-gray-300 cursor-pointer mr-1" />
        </CreateChannelDialog>
      </div>

      <CollapsibleContent className="flex flex-col mt-1">
        {channels.map((channel: TextChannel) => {
          const channelParticipants = activeVoiceChannels.find(
            (voiceChannel: ActiveVoiceChannel) => {
              return voiceChannel.channelId === channel.id;
            }
          );

          return (
            <div key={channel.id}>
              {channel.isVoice ? (
                <>
                  <VoiceChannelLink
                    channel={channel}
                    href={`/guilds/${guildId}/${channel.id}`}
                    guildId={guildId}
                    handleJoinChannel={() => handleJoinChannel(channel)}
                  />
                  {channelParticipants &&
                    channelParticipants.participants.map(
                      (participant, index) => (
                        <section
                          key={index}
                          className="ml-4 mr-2 my-1 flex items-center p-1 rounded-sm cursor-pointer relative hover:bg-neutral-800 "
                        >
                          <div
                            className={`w-7 h-7 relative ${
                              participant.isSpeaking &&
                              "outline outline-2 outline-green-500"
                            }`}
                          >
                            <Image
                              src={participant.imageUrl ?? ""}
                              alt="Participant profile picture"
                              fill
                              className="rounded-full"
                            />
                          </div>
                          <p className="text-neutral-300 ml-2 font-medium text-sm">
                            {participant.username}
                          </p>
                          {participant.isMuted && (
                            <MutedMicIcon
                              className="absolute right-0 text-gray-400"
                              color="#9ca3af"
                            />
                          )}
                        </section>
                      )
                    )}
                </>
              ) : (
                <ChannelLink
                  channel={channel}
                  href={`/guilds/${guildId}/${channel.id}`}
                  guildId={guildId}
                />
              )}
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
