import { PendingFriends } from "@/components/friends/FriendsCard";
import { getPending } from "@/services/friends";

export default async function Pending() {
  const { data } = await getPending();
  console.log(data);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800"></div>
    </div>
  );
}
