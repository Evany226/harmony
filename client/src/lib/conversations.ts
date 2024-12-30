const url = process.env.NEXT_PUBLIC_DEV_API_URL;

export async function getAllConversations(token: string) {
  const response = await fetch(`${url}/api/conversations`, {
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
  const response = await fetch(`${url}/api/conversations/${id}`, {
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

export async function getAllMessages(token: string, id: string) {
  const response = await fetch(`${url}/api/messages/${id}`, {
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

export async function getAllUnreadMessages(token: string) {
  const response = await fetch(`${url}/api/unread`, {
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

export async function getLiveKitToken(
  token: string,
  roomName: string,
  userId: string
) {
  const response = await fetch(`${url}/api/livekit/get-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomName: roomName,
      participantName: userId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function checkUserInRoom(
  token: string,
  roomName: string,
  participantName: string
) {
  const response = await fetch(`${url}/api/livekit/user-in-room`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomName: roomName,
      participantName: participantName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function checkRoomEmpty(token: string, roomName: string) {
  const response = await fetch(`${url}/api/livekit/room-empty`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomName: roomName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
