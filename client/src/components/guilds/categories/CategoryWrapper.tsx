"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import CategoryContextMenu from "./CategoryContextMenu";

import {
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import CreateChannelDialog from "../channels/CreateChannelDialog";
import { useState } from "react";

import { TextChannel } from "@/types";
import ChannelLink from "../channels/ChannelLink";
import VoiceChannelLink from "../channels/VoiceChanneLink";

interface CategoryWrapperProps {
  name: string;
  channels: TextChannel[];
  guildId: string;
  categoryId: string;
}

export default function CategoryWrapper({
  name,
  channels,
  guildId,
  categoryId,
}: CategoryWrapperProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
        {channels.map((channel: TextChannel) => (
          <div key={channel.id}>
            {channel.isVoice ? (
              <VoiceChannelLink
                channel={channel}
                href={`/guilds/${guildId}/${channel.id}`}
                guildId={guildId}
              />
            ) : (
              <ChannelLink
                channel={channel}
                href={`/guilds/${guildId}/${channel.id}`}
                guildId={guildId}
              />
            )}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
