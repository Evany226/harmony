import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import friends from "../../../../../friends.json";

export default async function Dashboard() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <FriendsWrapper users={friends.users} title="Online" pending={false} />
      </div>
    </div>
  );
}
