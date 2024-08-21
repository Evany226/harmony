import FriendsWrapper from "@/components/friends/FriendsCard";

export default function Pending() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <FriendsWrapper />
      </div>
    </div>
  );
}
