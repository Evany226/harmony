"use client";

import { Button } from "../../ui/button";
import React, { useState } from "react";
import { sendFriendRequest } from "@/lib/friends";
import { useToast } from "../../ui/use-toast";
import Loading from "../../global/Loading";

export default function AddFriendsForm() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      toast({
        variant: "destructive",
        title: "Failed to send friend request",
        description:
          "The username field cannot be empty. Please enter a valid username.",
      });
      return;
    }

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
        <Button
          variant="outline"
          size="sm"
          type="submit"
          className="w-40 bg-purple-700 text-gray-300 border-0 hover:bg-purple-800 hover:text-gray-200"
        >
          <Loading isLoading={isLoading}>
            <p>Send Friend Request</p>
          </Loading>
        </Button>
      </div>
    </form>
  );
}
