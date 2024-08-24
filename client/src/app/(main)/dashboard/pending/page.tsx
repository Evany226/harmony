import { getPending } from "@/lib/utils";
import FriendsWrapper from "@/components/friends/FriendsCard";

export default async function Pending() {
  const data = await getPending();

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <FriendsWrapper users={data} />
      </div>
    </div>
  );
}
