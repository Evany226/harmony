import { Skeleton } from "../ui/skeleton";
import FriendsNavButton from "../dashboard/friends/FriendsNavButton";

export default function PanelSkeleton() {
  return (
    <div className="flex flex-col w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
      <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
        <input
          className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
          placeholder="Find or start a conversation"
        ></input>
      </header>

      <div className="flex flex-col p-3">
        <FriendsNavButton />
        <p>Loading...</p>
      </div>

      <Skeleton className="w-full h-12 mt-4" />
    </div>
  );
}
