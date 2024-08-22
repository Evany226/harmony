"use client";

import { Button } from "../ui/button";
import React, { useState } from "react";
import { sendFriendRequest } from "@/services/friends";

export default function AddFriendsForm() {
  const [username, setUsername] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendFriendRequest(username);
      setUsername("");
    } catch (error) {
      console.log("Failed to send friend request", error);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        className="outline-0 rounded-md w-full text-sm bg-zinc-800 py-3 px-3 text-gray-300"
        placeholder="Add friends by entering their username."
        onChange={(e) => handleChange(e)}
        value={username}
      ></input>
      <div className="w-full flex justify-end">
        <Button variant="outline" size="sm" type="submit">
          Send friend request
        </Button>
      </div>
    </form>
  );
}
