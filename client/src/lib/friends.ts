//client side methods that gets data from route handlers in the server

const url = process.env.NEXT_PUBLIC_DEV_API_URL;

// lib/utils.ts or utils/utils.ts
export async function getAllFriends(token: string) {
  const response = await fetch(`${url}/api/friends`, {
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
  const response = await fetch(`${url}/api/requests`, {
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
