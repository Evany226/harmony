"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const acceptGuildRequest = async (id: string) => {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(
    `http://localhost:3001/api/guild-requests/${id}/accept`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  revalidatePath("/guild-requests/pending");

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const rejectGuildRequest = async (id: string) => {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(
    `http://localhost:3001/api/guild-requests/${id}/reject`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  revalidatePath("/guild-requests/pending");

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};
