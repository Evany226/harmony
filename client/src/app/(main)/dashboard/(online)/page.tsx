import FriendsWrapper from "@/components/friends/friends-card";

export default function Dashboard() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <FriendsWrapper />
      </div>
    </div>
  );
}
