"use client";

import { TextChannel } from "@/types";
import { usePathname } from "next/navigation";

import { Cog8ToothIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";

import EditChannelDialog from "./EditChannelDialog";

interface VoiceChannelLinkProps {
  channel: TextChannel;
  href: string;
  guildId: string;
  handleJoinChannel: () => void;
}

export default function VoiceChannelLink({
  channel,
  href,
  guildId,
  handleJoinChannel,
}: VoiceChannelLinkProps) {
  const pathname = usePathname();
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
    </>
  );
}
