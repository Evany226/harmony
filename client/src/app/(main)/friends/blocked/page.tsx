import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import friends from "../../../../../friends.json";

export default function Blocked() {
  return (
    <div className="flex flex-col items-center w-3/4 h-full py-3  overflow-y-hidden">
      <FriendsWrapper
        friends={friends.users}
        variant="Blocked"
        emptyStateText="You currently have no one on your block list."
      />
    </div>
  );
}
