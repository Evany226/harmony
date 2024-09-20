"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface InviteDialogItemProps {
  id: string;
  friendName: string;
  imageUrl: string;
  username: string;
  setUsername(arg: string): void;
}

export default function InviteDialogItem({
  id,
  friendName,
  imageUrl,
  username,
  setUsername,
}: InviteDialogItemProps) {
  return (
    <div className="w-full flex items-center flex-between group hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer">
      <div className="w-full flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <Skeleton className="w-full h-full" />
          </AvatarFallback>
        </Avatar>
        <label className="w-full text-base text-gray-300 group-hover:text-white outline-0 cursor-pointer">
          {friendName}
        </label>
      </div>
      <input
        type="radio"
        name={id}
        checked={username === friendName}
        onChange={() => setUsername(friendName)}
        className="w-4 h-4 accent-blue-500 border-gray-300 rounded-md"
      />
    </div>
  );
}
