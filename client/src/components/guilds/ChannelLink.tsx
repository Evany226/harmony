"use client";

import { TextChannel } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HashtagIcon } from "@heroicons/react/24/solid";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";

import { useState } from "react";
import EditChannelDialog from "./EditChannelDialog";

interface ChannelLinkProps {
  channel: TextChannel;
  href: string;
  guildId: string;
}

export default function ChannelLink({
  channel,
  href,
  guildId,
}: ChannelLinkProps) {
  const pathname = usePathname();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <Link
      href={href}
      className={`group py-1 rounded-sm flex items-center justify-between px-2 ${
        pathname == href ? "bg-zinc-700" : "hover:bg-neutral-800"
      }`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div className="flex items-center">
        <HashtagIcon className="w-4 text-gray-300 cursor-pointer" />
        <p
          className={`text-sm font-medium ml-2 ${
            pathname == href
              ? "text-white"
              : "text-zinc-400 group-hover:text-white"
          }`}
        >
          {channel.name}
        </p>
      </div>

      {isHovering || pathname == href ? (
        <div className="flex items-center">
          <EditChannelDialog
            name={channel.name}
            id={channel.id}
            guildId={guildId}
          >
            <Cog8ToothIcon className="w-4 text-gray-400 cursor-pointer hover:text-white" />
          </EditChannelDialog>
        </div>
      ) : null}
    </Link>
  );
}
