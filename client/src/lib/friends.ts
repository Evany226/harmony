//client side methods that gets data from route handlers in the server

// lib/utils.ts or utils/utils.ts
export async function getAllFriends(token: string) {
  const response = await fetch("http://localhost:3001/api/friends", {
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

export async function getPending(token: string) {
  const response = await fetch("http:/localhost:3001/api/requests", {
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

export async function acceptFriendRequest(id: string) {
  const response = await fetch(`/api/acceptRequest/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function rejectFriendRequest(id: string) {
  const response = await fetch(`/api/rejectRequest/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function removeFriend(id: string) {
  const response = await fetch(`/api/removeFriend/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
