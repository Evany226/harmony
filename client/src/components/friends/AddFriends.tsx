"use client";

import { Button } from "../ui/button";
import React, { useState } from "react";
import { sendFriendRequest } from "@/services/friends";
import { useToast } from "../ui/use-toast";

export default function AddFriendsForm() {
  const [username, setUsername] = useState<string>("");

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await sendFriendRequest(username);
      setUsername("");
      toast({
        variant: "default",
        title: "Friend request sent!",
        description:
          "Your friend request has been successfully sent. Keep an eye out for their response!",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to send friend request",
        description:
          error.message ||
          "An error occurred while sending your friend request. Please try again later",
      });
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        className="outline-0 rounded-md w-full text-sm bg-zinc-800 py-3 px-3 text-gray-300"
        placeholder="Add friends by entering their username."
        onChange={(e) => handleChange(e)}
        value={username}
        required
      ></input>
      <div className="w-full flex justify-end">
        <Button variant="outline" size="sm" type="submit">
          Send friend request
        </Button>
      </div>
    </form>
  );
}
