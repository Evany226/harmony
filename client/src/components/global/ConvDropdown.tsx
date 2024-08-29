import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConvDropdownItem from "./ConvDropdownItem";
import { getAllFriends } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Friend } from "@/types";

export default async function ConvDropdown({
  children,
}: {
  children: React.ReactNode;
}) {
  const [friends, setFriends] = useState<Friend[]>([]);

  const { getToken } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        alignOffset={12}
        className="bg-zinc-800 px-4 py-2 "
      >
        <DropdownMenuLabel className="text-lg px-0 ">
          Select Friends
        </DropdownMenuLabel>
        <p className="text-gray-300 text-sm ">
          You can select a maximum of 10 friends to start a conversation.
        </p>
        <div className="w-full my-2">
          <input
            className="w-full outline-0 bg-zinc-900 text-gray-200 py-1 px-2 rounded-sm text-sm placeholder-gray-400"
            placeholder="Type the username of a friend."
          ></input>
        </div>
        <ConvDropdownItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
