"use client";
import FriendsWrapper from "@/components/friends/FriendsCard";
import { useAuth } from "@clerk/nextjs";
export default function Dashboard() {
  const { getToken } = useAuth();

  const testFetch = async () => {
    const authObject = await fetch("http://localhost:3001/", {
      method: "GET",
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json());

    console.log(authObject.userId);
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <button onClick={() => testFetch()}>hello</button>
        <FriendsWrapper />
      </div>
    </div>
  );
}
