import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function FriendSkeleton() {
  return (
    <section className="flex-col">
      <div className="flex flex-col w-full bg-zinc-900 rounded-sm hover:bg-zinc-800 group cursor-pointer">
        <div className="flex items-center w-full justify-between py-3 px-2">
          <main className="flex items-center w-full">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-700" />
            <div className="flex-col ml-4 space-y-2">
              <Skeleton className="w-40 h-3 mb-1 bg-gray-700" />
              <Skeleton className="w-32 h-3 mr-1" />
            </div>
          </main>

          <aside className="flex items-center space-x-2">
            <Skeleton className="w-9 h-9 rounded-full bg-gray-700" />
            <Skeleton className="w-9 h-9 rounded-full" />
          </aside>
        </div>
      </div>
      <Separator orientation="horizontal" />
    </section>
  );
}

export default function FriendPageSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <section className="flex-col w-full h-full">
          <div className="flex flex-col justify-start">
            <div className="flex items-center">
              <Skeleton className="w-12 h-4 mb-2 ml-2 bg-gray-700" />
              <Skeleton className="w-8 h-4 mb-2 mx-2" />
            </div>
            <Separator orientation="horizontal" />
          </div>

          <FriendSkeleton />
          <FriendSkeleton />
          <FriendSkeleton />
          <FriendSkeleton />
        </section>
      </div>
    </div>
  );
}
