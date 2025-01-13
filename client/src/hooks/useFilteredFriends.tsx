"use client";

import { useState, useEffect } from "react";
import { Friend } from "@/types";
import { Friends } from "@/components/dashboard/friends/FriendsCard";
import { useSocket } from "@/context/SocketContext";

export function useFilteredFriends(friends: Friend[]) {
  const { onlineUsers } = useSocket();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredFriends = !searchTerm
    ? friends
    : friends.filter((friend) =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const filteredOnlineFriends = filteredFriends.filter((friend) =>
    onlineUsers.includes(friend.id)
  );

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return {
    searchTerm,
    filteredOnlineFriends,
    filteredFriends,
    handleSearchTerm,
  };
}
