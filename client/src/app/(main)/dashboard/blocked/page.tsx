import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import friends from "../../../../../friends.json";

export default function Blocked() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <FriendsWrapper friends={friends.users} variant="Blocked" />
      </div>
    </div>
  );
}
