"use client";

import { createContext, useContext } from "react";
import { Friend } from "@/types";
import { useState } from "react";

interface FriendContextProps {
  friends: Friend[];
  updateAfterAccept: (friend: Friend) => void;
  updateAfterRemove: (friend: Friend) => void;
}

const FriendContext = createContext<FriendContextProps | undefined>(undefined);

export function FriendProvider({
  children,
  initialFriends,
}: {
  children: React.ReactNode;
  initialFriends?: Friend[];
}) {
  const [friends, setFriends] = useState<Friend[]>(initialFriends ?? []);

  const updateAfterAccept = (friend: Friend) => {
    setFriends((prev) => [...prev, friend]);
  };

  const updateAfterRemove = (friend: Friend) => {
    setFriends((prev) => prev.filter((f) => f.id !== friend.id));
  };

  const value = {
    friends,
    updateAfterAccept,
    updateAfterRemove,
  };

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
}

export function useFriend() {
  const context = useContext(FriendContext);
  if (context === undefined) {
    throw new Error("useFriend must be used within a FriendProvider");
  }
  return context;
}
