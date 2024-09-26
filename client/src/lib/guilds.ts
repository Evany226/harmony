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

export const getAllChannelMessages = async (
  token: string,
  channelId: string
) => {
  const response = await fetch(
    `http://localhost:3001/api/guild-messages/${channelId}`,
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

export const getMember = async (token: string, guildId: string) => {
  const response = await fetch(
    `http://localhost:3001/api/members/${guildId}/single`,
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

export const getPendingGuildReq = async (token: string) => {
  const response = await fetch(`http://localhost:3001/api/guild-requests`, {
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

export const acceptGuildRequest = async (id: string) => {
  const response = await fetch(`/api/acceptGuildRequest/${id}`, {
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
};

export const rejectGuildRequest = async (id: string) => {
  const response = await fetch(`/api/rejectGuildRequest/${id}`, {
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
};

export const getUserChannelIds = async (token: string) => {
  const response = await fetch(`http://localhost:3001/api/channels/`, {
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
