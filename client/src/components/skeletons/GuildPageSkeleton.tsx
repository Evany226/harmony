import { Skeleton } from "../ui/skeleton";
import ChatInput from "../global/ChatInput";
import { MessageSkeleton } from "./MessageSkeleton";

export function GuildPageSkeleton() {
  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-x-3 items-center">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-48 h-3 rounded-md" />
      </header>

      <main className="w-full h-[calc(100%-3rem)] flex ">
        <article className="w-full h-full flex flex-col relative px-5 md:w-full">
          <div className="h-full w-full flex flex-col my-6 space-y-6 overflow-hidden">
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
            <MessageSkeleton variant="short" />
            <MessageSkeleton variant="medium" />
            <MessageSkeleton variant="long" />
            <MessageSkeleton variant="short" />
          </div>
          <ChatInput />
        </article>
      </main>
    </>
  );
}
