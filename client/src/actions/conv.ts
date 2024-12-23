"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createConversation(formData: FormData) {
  const selectedFriends = [];

  //key is the id of the checkbox item aka userId. value is the value of the checkbox, when it is checked its default is "on"
  for (const [key, value] of formData.entries()) {
    if (value === "true") {
      selectedFriends.push(key);
    }
  }

  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch("http://localhost:3001/api/conversations", {
      method: "POST",
      body: JSON.stringify({ otherUserIds: selectedFriends }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error creating conversation.");
    }

    revalidatePath("/conversations");

    return data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error; // Ensure the error is propagated
  }
}

export async function updateLastViewed(conversationId: string) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(
    `http://localhost:3001/api/unread/updateLastViewed`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ conversationId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  revalidatePath("/");

  return data;
}

export async function editMessage(messageId: string, formData: FormData) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`http://localhost:3001/api/messages/`, {
    method: "PUT",
    body: JSON.stringify({
      messageId: messageId,
      content: formData.get("content"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Express error updating message.");
  }

  return data;
}

export async function createMessage(conversationId: string, message: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(`http://localhost:3001/api/messages`, {
      method: "POST",
      body: JSON.stringify({
        content: message,
        conversationId: conversationId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error updating channel.");
    }

    return data;
  } catch (error) {
    console.error("Error updating channel:", error);
    throw error;
  }
}
