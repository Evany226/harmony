"use client";

import Image from "next/image";
import ConnectionStatus from "../../global/ConnectionStatus";
import { User } from "@/types";
import { useSocket } from "@/context/SocketContext";

export default function MemberCard({ member }: { member: User }) {
  const { onlineUsers } = useSocket();

  const status = onlineUsers.includes(member.id);

  return (
    <div className="flex items-center w-full bg-zinc-900 py-2 px-2 rounded-sm hover:bg-neutral-800 cursor-pointer">
      <div className="relative">
        <div className="w-8 h-8">
          <Image
            src={member.imageUrl}
            alt="Guild profile picture"
            fill
            className="rounded-full"
          />
        </div>
        <ConnectionStatus isConnected={status} />
      </div>
      <div className="flex items-center ml-3 max-w-full no-wrap overflow-hidden">
        <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
          {member.username}
        </p>
      </div>
    </div>
  );
}
