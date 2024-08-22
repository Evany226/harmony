import { clerkClient } from "@clerk/clerk-sdk-node";

export const userList = clerkClient.users.getUserList();
