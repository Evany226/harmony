"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
      body: JSON.stringify({ participantIds: selectedFriends }),
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

export async function createNewGuild(formData: FormData) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch("http://localhost:3001/api/guilds", {
      method: "POST",
      body: JSON.stringify({ name: formData.get("name") }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error creating guild.");
    }

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error creating guild:", error);
    throw error; // Ensure the error is propagated
  }
}

export async function createCategory(formdata: FormData) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch("http://localhost:3001/api/categories", {
      method: "POST",
      body: JSON.stringify({
        guildId: formdata.get("guildId"),
        name: formdata.get("name"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error creating category.");
    }

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function createChannel(formdata: FormData) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch("http://localhost:3001/api/channels", {
      method: "POST",
      body: JSON.stringify({
        categoryId: formdata.get("categoryId"),
        name: formdata.get("name"),
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
  } catch (error) {
    console.error("Error creating channel:", error);
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
