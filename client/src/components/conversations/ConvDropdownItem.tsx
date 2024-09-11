"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface ConvDropdownItemProps {
  id: string;
  username: string;
  imageUrl: string;
}

export default function ConvDropdownItem({
  id,
  username,
  imageUrl,
}: ConvDropdownItemProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div
      className="w-full flex items-center flex-between group hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer"
      onClick={() => setChecked(!checked)}
    >
      <div className="w-full flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <Skeleton className="w-full h-full" />
          </AvatarFallback>
        </Avatar>
        <label className="w-full text-base text-gray-300 group-hover:text-white outline-0 cursor-pointer">
          {username}
        </label>
      </div>
      <input
        type="checkbox"
        name={id}
        checked={checked}
        value={checked.toString()}
        className="w-4 h-4 accent-blue-500 border-gray-300 rounded-md"
      />
    </div>
  );
}
