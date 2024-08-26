import { Skeleton } from "../ui/skeleton";

export default function DmCardSkeleton() {
  return (
    <div
      className={`flex items-center max-w-52 bg-neutral-900 px-2 py-2 mt-1 rounded-sm `}
    >
      <Skeleton className="w-10 h-10 rounded-full" />

      <div className="flex flex-col">
        <Skeleton className="ml-2 w-32 h-3 mb-1" />
        <Skeleton className="ml-2 w-28 h-2 mb-1" />
      </div>
    </div>
  );
}
