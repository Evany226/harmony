import { Skeleton } from "../ui/skeleton";

export default function ProfileCardSkeleton() {
  return (
    <div className="flex items-center w-full h-14 px-3 bg-stone-900 border-t border-zinc-800 bottom-0 absolute">
      <Skeleton className="w-8 h-8 rounded-full" />

      <div className="flex-col ml-2">
        <Skeleton className="w-36 h-3 mb-1" />
        <div className="flex items-center">
          <Skeleton className="w-28 h-2 mr-1" />
        </div>
      </div>
    </div>
  );
}
