import { HashtagIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import { TextChannel } from "@/types";
import { TooltipWrapper } from "../global/TooltipWrapper";

import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

interface GuildPageHeaderProps {
  channel: TextChannel;
  toggleUserPanel: () => void;
  isPanelOpen: boolean;
}

export default function GuildPageHeader({
  channel,
  toggleUserPanel,
  isPanelOpen,
}: GuildPageHeaderProps) {
  return (
    <header className="flex w-full items-center justify-between h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3">
      <div className="flex items-center">
        <HashtagIcon className="w-5 text-gray-300 cursor-pointer ml-2" />
        <h1 className="text-gray-300 font-semibold ml-1 text-sm">
          {channel.name}
        </h1>
        {channel.topic && (
          <>
            <Separator className="mx-3" orientation="vertical" />
            <p className="text-gray-400 font-medium text-xs">{channel.topic}</p>
          </>
        )}
      </div>
      <div className="flex space-x-4 items-center mr-2">
        <TooltipWrapper
          text={`${isPanelOpen ? "Hide Member List" : "Show Member List"}`}
        >
          <UserGroupIcon
            className="w-6 h-6 text-gray-400 hover:text-gray-300 cursor-pointer"
            onClick={toggleUserPanel}
          />
        </TooltipWrapper>
        <div className="flex items-center bg-zinc-800 rounded-sm py-1 px-2">
          <input
            className="outline-0 w-full bg-zinc-800 font-semibold text-xs"
            placeholder="Search"
          ></input>
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-pointer" />
        </div>
        <QuestionMarkCircleIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 cursor-pointer" />
      </div>
    </header>
  );
}
