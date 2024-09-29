import { Skeleton } from "../ui/skeleton";
import ChatInput from "../global/ChatInput";
import { MessageSkeleton } from "./MessageSkeleton";

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

export function GuildPageSkeleton() {
  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-x-3 items-center">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-48 h-3 rounded-md" />
      </header>

      <main className="w-full h-[calc(100%-3rem)] flex ">
        <article className="w-[calc(100%-16rem)] h-full border-r border-zinc-800 flex flex-col relative px-5">
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
            <MessageSkeleton variant="short" />
            <MessageSkeleton variant="medium" />
            <MessageSkeleton variant="long" />
            <MessageSkeleton variant="short" />
          </div>
          <ChatInput />
        </article>

        <article className="w-64 h-full border-r border-zinc-800 flex flex-col relative px-4 space-y-6 py-4">
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
        </article>
      </main>
    </>
  );
}
