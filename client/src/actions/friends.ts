"use server";

import { auth } from "@clerk/nextjs/server";
import { url } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createFriendRequest(username: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(`${url()}/api/requests`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error creating guild request.");
    }

    revalidatePath("/home/friends");

    return data;
  } catch (error) {
    console.error("Error creating guild request:", error);
    throw error;
  }
}

export async function acceptFriendRequest(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`${url()}/api/requests/${id}/accept`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  revalidatePath("/home/friends");

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function rejectFriendRequest(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`${url()}/api/requests/${id}/reject`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  revalidatePath("/home/friends/pending");

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function removeFriend(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`${url()}/api/friends/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  revalidatePath("/home/friends");

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
