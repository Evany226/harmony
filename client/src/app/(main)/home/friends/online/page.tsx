import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import { getAllFriends } from "@/lib/friends";
import { auth } from "@clerk/nextjs/server";

export default async function OnlineFriends() {
  const { getToken } = auth();
  const token = await getToken();

  const data = await getAllFriends(token as string);

  return (
    <div className="flex flex-col items-center w-3/4 h-full py-3 overflow-y-hidden">
      <FriendsWrapper
        friends={data}
        variant="Online"
        emptyStateText="None of your friends are currently online"
      />
    </div>
  );
}
