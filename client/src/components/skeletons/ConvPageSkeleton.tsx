import { Skeleton } from "../ui/skeleton";
import ChatInput from "../global/ChatInput";

interface MessageSkeletonProps {
  variant: "short" | "medium" | "long";
}
function MessageSkeleton({ variant }: MessageSkeletonProps) {
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

export default function ConvPageSkeleton() {
  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-x-3 items-center">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-48 h-3 rounded-md" />
      </header>

      <main className="w-full h-[calc(100%-3rem)] flex flex-col">
        <article className="w-3/4 h-full border-r border-zinc-800 flex flex-col relative px-5">
          <div className="h-full w-full flex flex-col my-6 space-y-6">
            <MessageSkeleton variant="short" />
            <MessageSkeleton variant="long" />
            <MessageSkeleton variant="medium" />
            <MessageSkeleton variant="short" />
            <MessageSkeleton variant="medium" />
            <MessageSkeleton variant="short" />
            <MessageSkeleton variant="medium" />
            <MessageSkeleton variant="long" />
            <MessageSkeleton variant="long" />
            <MessageSkeleton variant="medium" />
          </div>
          <ChatInput />
        </article>
      </main>
    </>
  );
}
