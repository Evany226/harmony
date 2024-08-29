import { Skeleton } from "../ui/skeleton";
import FriendsNavButton from "../dashboard/friends/FriendsNavButton";
import ConvLinkSkeleton from "./ConvLinkSkeleton";

export default function PanelSkeleton() {
  return (
    <div className="flex flex-col min-w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
      <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
        <input
          className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
          placeholder="Find or start a conversation"
        ></input>
      </header>

      <div className="flex flex-col p-3">
        <FriendsNavButton />

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
            <ConvLinkSkeleton />
            <ConvLinkSkeleton />
            <ConvLinkSkeleton />
            <ConvLinkSkeleton />
          </div>
        </section>
      </div>
    </div>
  );
}
