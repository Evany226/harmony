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

export async function updateCategory(formdata: FormData, categoryId: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `http://localhost:3001/api/categories/${categoryId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: formdata.get("name"),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error updating category.");
    }

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error deleting category.");
    }

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error deleting category:", error);
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

export async function createGuildRequest(username: string, guildId: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch("http://localhost:3001/api/guild-requests", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        guildId: guildId,
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

    revalidatePath("/guilds");
  } catch (error) {
    console.error("Error creating guild request:", error);
    throw error;
  }
}

export async function leaveGuild(guildId: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `http://localhost:3001/api/guilds/${guildId}/leave`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error leaving guild.");
    }

    revalidatePath("/friends");
    redirect("/friends");

    return data;
  } catch (error) {
    console.error("Error leaving guild:", error);
    throw error;
  }
}

export async function deleteGuild(guildId: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `http://localhost:3001/api/guilds/${guildId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Express error deleting guild.");
    }

    revalidatePath("/friends");
    redirect("/friends");
  } catch (error) {
    console.error("Error deleting guild:", error);
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

    revalidatePath(`/guilds/${guildId}/${channelId}`);

    return data;
  } catch (error) {
    console.error("Error updating channel:", error);
    throw error;
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