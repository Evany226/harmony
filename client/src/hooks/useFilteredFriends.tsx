"use client";

import { useState, useEffect } from "react";
import { Friend } from "@/types";
import { Friends } from "@/components/dashboard/friends/FriendsCard";
import { useSocket } from "@/context/SocketContext";

export function useFilteredFriends(friends: Friend[]) {
  const { onlineUsers } = useSocket();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>(friends);

  useEffect(() => {
    const onlineFriends = friends.filter((friend) =>
      onlineUsers.includes(friend.id)
    );

    if (!searchTerm) {
      setFilteredOnlineFriends(onlineFriends);
    } else {
      const filteredItems = onlineFriends.filter((friend) =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOnlineFriends(filteredItems);
    }
  }, [onlineUsers, friends, searchTerm]);

  const [filteredOnlineFriends, setFilteredOnlineFriends] = useState<Friend[]>(
    []
  );

  const handleUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = friends.filter((friend) =>
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("Filtered items", filteredItems);

    setFilteredFriends(filteredItems);
  };

  return {
    searchTerm,
    filteredOnlineFriends,
    filteredFriends,
    handleUsers,
  };
}
