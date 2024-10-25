import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface ConvProfilePanelProps {
  imageUrl: string;
  name: string;
}

export default function ConvProfilePanel({
  imageUrl,
  name,
}: ConvProfilePanelProps) {
  return (
    <aside className="bg-neutral-900 w-1/5 h-full flex flex-col px-2 py-2">
      <div className="w-full h-28 bg-purple-900 relative"></div>
      <Avatar className="w-24 h-24 absolute top-28 ml-2 border-4 border-neutral-900">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          {" "}
          <Skeleton className="w-full h-full" />
        </AvatarFallback>
      </Avatar>
      <div className="w-full h-[calc(100%-7rem)] pt-12 px-2 space-y-4 relative">
        <p className="text-gray-300 text-lg font-semibold">{name}</p>

        <section className="w-full bg-zinc-950 flex flex-col py-3 px-3 space-y-1 rounded-md">
          <p className="text-gray-300 text-xs font-semibold">Member since</p>
          <p className="text-gray-300 text-xs">Jan 7th, 2017</p>
        </section>

        <section className="w-full bg-zinc-950 flex flex-col py-3 px-3 space-y-1 rounded-md">
          <p className="text-gray-300 text-sm font-medium">1 Mutual Friend</p>
        </section>
      </div>

      <section className="pb-2 pt-1 flex w-full items-center justify-center border-t border-zinc-700">
        <p className="text-gray-400 text-sm mt-2">View Full Profile</p>
      </section>
    </aside>
  );
}
