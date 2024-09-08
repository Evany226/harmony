"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import { useState } from "react";

import { TextChannel } from "@/types";
import ChannelLink from "./ChannelLink";

interface CategoryWrapperProps {
  name: string;
  channels: TextChannel[];
  guildId: string;
}

export default function CategoryWrapper({
  name,
  channels,
  guildId,
}: CategoryWrapperProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-between items-center">
        <CollapsibleTrigger>
          <main className="flex items-center space-x-1">
            {isOpen ? (
              <ChevronRightIcon className="w-3 text-gray-300 cursor-pointer font-bold" />
            ) : (
              <ChevronDownIcon className="w-3 text-gray-300 cursor-pointer font-bold" />
            )}
            <p className="text-sm text-gray-300 font-medium">{name}</p>
          </main>
        </CollapsibleTrigger>

        <aside className="">
          <PlusIcon className="w-4 text-gray-300 cursor-pointer" />
        </aside>
      </div>

      <CollapsibleContent className="flex flex-col mt-1">
        {channels.map((channel: TextChannel) => (
          <ChannelLink
            key={channel.id}
            channel={channel}
            href={`/guilds/${guildId}/${channel.id}`}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
