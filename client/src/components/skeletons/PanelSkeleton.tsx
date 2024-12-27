import { Skeleton } from "../ui/skeleton";
import FriendsNavButton from "../dashboard/friends/FriendsNavButton";
import GuildNavButton from "../dashboard/guild-requests/GuildNavButton";

function ConvLinkSkeleton() {
  return (
    <div
      className={`flex items-center max-w-52 bg-neutral-900 px-2 py-2 mt-1 rounded-sm `}
    >
      <Skeleton className="w-10 h-10 rounded-full" />

      <div className="flex flex-col space-y-2">
        <Skeleton className="ml-2 w-32 h-3 " />
        <Skeleton className="ml-2 w-28 h-3 " />
      </div>
    </div>
  );
}

export default function PanelSkeleton({
  showOnMobile,
}: {
  showOnMobile: boolean;
}) {
  return (
    <div className={`flex flex-col min-w-64 h-full bg-neutral-900 border-x border-zinc-800 relative ${showOnMobile ? "sm:w-full": "sm:w-0 sm:hidden"}`}>
      <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
        <input
          className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
          placeholder="Find or start a conversation"
        ></input>
      </header>

      <div className="flex flex-col p-3">
        <FriendsNavButton />
        <GuildNavButton />

        <section className="flex-col w-full max-h-full mt-4">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-gray-400 text-sm font-medium">
              Direct Messages
            </h2>
            {/* <PlusIcon className="w-4 text-gray-400" /> */}
          </div>

          <div className="flex-col mt-3">
            <ConvLinkSkeleton />
            <ConvLinkSkeleton />
          </div>
        </section>
      </div>
    </div>
  );
}
