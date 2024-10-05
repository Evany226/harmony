import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import { auth } from "@clerk/nextjs/server";
import { getAllFriends } from "@/lib/friends";

export default async function Dashboard() {
  const { getToken } = auth();
  const token = await getToken();

  const data = await getAllFriends(token as string);

  return (
    <div className="flex flex-col items-center w-3/4 h-full py-3 border-r border-zinc-800 overflow-y-hidden">
      <FriendsWrapper friends={data} variant="All" />
    </div>
  );
}
