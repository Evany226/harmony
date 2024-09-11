import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import ConnectionStatus from "../global/ConnectionStatus";
import { User } from "@/types";

export default function MemberCard({ member }: { member: User }) {
  return (
    <div className="flex items-center w-full bg-zinc-900 py-2 px-2 rounded-sm hover:bg-neutral-800 cursor-pointer">
      <div className="relative">
        <Avatar className="w-8 h-8">
          <AvatarImage src={member.imageUrl} />
          <AvatarFallback>
            <Skeleton className="w-full h-full" />
          </AvatarFallback>
        </Avatar>
        <ConnectionStatus isConnected={false} />
      </div>
      <div className="flex items-center ml-3 max-w-full no-wrap overflow-hidden">
        <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
          {member.username}
        </p>
      </div>
    </div>
  );
}
