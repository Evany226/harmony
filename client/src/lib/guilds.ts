export const getAllGuilds = async (token: string) => {
  const response = await fetch("http://localhost:3001/api/guilds", {
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
};

export const getGuild = async (token: string, id: string) => {
  const response = await fetch(`http://localhost:3001/api/guilds/${id}`, {
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
};

export const getChannel = async (token: string, id: string) => {
  const response = await fetch(`http://localhost:3001/api/channels/${id}`, {
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
};

export const getFirstChannel = async (token: string, guildId: string) => {
  const response = await fetch(
    `http://localhost:3001/api/channels/first/${guildId}`,
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
};

export const getAllMembers = async (token: string, guildId: string) => {
  const response = await fetch(`http://localhost:3001/api/members/${guildId}`, {
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
};
