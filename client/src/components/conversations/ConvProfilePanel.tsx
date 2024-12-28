import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import MemberCard from "../guilds/users/MemberCard";
import { User } from "@/types";

interface ConvProfilePanelProps {
  imageUrl: string;
  name: string;
  isPanelOpen: boolean;
  isMultiUser: boolean;
  users: User[];
}

export default function ConvProfilePanel({
  imageUrl,
  name,
  isPanelOpen,
  isMultiUser,
  users,
}: ConvProfilePanelProps) {
  return (
    <aside
      className={`bg-neutral-900 h-full flex flex-col px-2 py-2  ${
        isPanelOpen ? "w-1/5 sm:hidden sm:w-0" : "w-0 hidden"
      } transition-all duration-300 ease-in-out sm:w-0 sm:hidden `}
    >
      {isMultiUser ? (
        <ScrollArea
          className={`h-full flex flex-col relative space-y-0
          }`}
        >
          {users.map((user: User) => {
            return (
              <div key={user.id}>
                <MemberCard member={user} />
              </div>
            );
          })}
        </ScrollArea>
      ) : (
        <>
          <div className="w-full h-28 bg-purple-900 relative"></div>
          <Avatar className="w-24 h-24 absolute top-28 ml-2 border-4 border-neutral-900">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              {" "}
              <Skeleton className="w-full h-full" />
            </AvatarFallback>
          </Avatar>
          <div className="w-full h-[calc(100%-7rem)] pt-12 px-2 space-y-4 relative">
            <p className="text-gray-300 text-lg font-semibold ml-1">{name}</p>

            <section className="w-full bg-zinc-950 flex flex-col py-3 px-3 space-y-1 rounded-md">
              <p className="text-gray-300 text-xs font-semibold">
                Member since
              </p>
              <p className="text-gray-300 text-xs">Jan 7th, 2017</p>
            </section>

            <section className="w-full bg-zinc-950 flex flex-col py-3 px-3 space-y-1 rounded-md">
              <p className="text-gray-300 text-sm font-medium">
                1 Mutual Friend
              </p>
            </section>
          </div>
        </>
      )}
    </aside>
  );
}
