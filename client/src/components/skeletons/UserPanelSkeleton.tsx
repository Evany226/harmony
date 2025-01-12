import { Skeleton } from "../ui/skeleton";

function UserSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="w-8 h-8 rounded-full bg-neutral-600" />

      <div className="flex-col ml-4 space-y-2">
        <Skeleton className="w-36 h-3 mb-1 bg-neutral-600" />
        <Skeleton className="w-28 h-2 mr-1" />
      </div>
    </div>
  );
}

export default function UserPanelSkeleton() {
  return (
    <article className="w-56 h-full border-r border-zinc-800 flex flex-col relative px-4 space-y-6 py-4 md:w-0 md:hidden">
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
    </article>
  );
}
