export async function getAllConversations(token: string) {
  const response = await fetch("http://localhost:3001/api/conversations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function getConversation(token: string, id: string) {
  const response = await fetch(
    `http://localhost:3001/api/conversations/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
