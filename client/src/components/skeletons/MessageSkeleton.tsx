import { Skeleton } from "../ui/skeleton";

interface MessageSkeletonProps {
  variant: "short" | "medium" | "long";
}

export function MessageSkeleton({ variant }: MessageSkeletonProps) {
  switch (variant) {
    case "short":
      return (
        <div className="w-full flex">
          <Skeleton className="w-8 h-8 rounded-full bg-neutral-600" />

          <div className="flex-col ml-4 space-y-2">
            <Skeleton className="w-40 h-3 mb-1 bg-neutral-600" />
            <Skeleton className="w-32 h-3 mr-1" />
          </div>
        </div>
      );
    case "medium":
      return (
        <div className="w-full flex">
          <Skeleton className="w-8 h-8 rounded-full bg-neutral-800" />

          <div className="flex-col ml-4 space-y-2">
            <Skeleton className="w-72 h-3 mb-1 bg-neutral-800" />
            <Skeleton className="w-48 h-3 mr-1" />
          </div>
        </div>
      );
    case "long":
      return (
        <div className="w-full flex">
          <Skeleton className="w-8 h-8 rounded-full bg-neutral-700" />

          <div className="flex-col ml-4 space-y-2">
            <Skeleton className="w-[30rem] h-3 mb-1 bg-neutral-700" />
            <Skeleton className="w-[16rem] h-3 mr-1" />
          </div>
        </div>
      );
    default:
      return null;
  }
}
