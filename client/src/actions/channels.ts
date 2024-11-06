"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createChannel(formdata: FormData) {
  const { getToken } = auth();
  const token = await getToken();

  const isVoice = formdata.get("channel") === "voice";

  try {
    const response = await fetch("http://localhost:3001/api/channels", {
      method: "POST",
      body: JSON.stringify({
        categoryId: formdata.get("categoryId"),
        name: formdata.get("name"),
        isVoice: isVoice,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error creating channel.");
    }

    revalidatePath("/guilds");

    return data;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
}

export async function updateChannel(formdata: FormData, channelId: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `http://localhost:3001/api/channels/${channelId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: formdata.get("name"),
          topic: formdata.get("topic"),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error updating channel.");
    }

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error updating channel:", error);
    throw error;
  }
}

export async function deleteChannel(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(`http://localhost:3001/api/channels/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error deleting channel.");
    }

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error deleting channel:", error);
    throw error;
  }
}

export async function createChannelMessage(
  channelId: string,
  guildId: string,
  formdata: FormData
) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(`http://localhost:3001/api/guild-messages`, {
      method: "POST",
      body: JSON.stringify({
        channelId: channelId,
        guildId: guildId,
        messageContent: formdata.get("content"),
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

export async function editChannelMessage(
  messageId: string,
  formData: FormData
) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`http://localhost:3001/api/guild-messages/`, {
    method: "PUT",
    body: JSON.stringify({
      messageId: messageId,
      messageContent: formData.get("content"),
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
