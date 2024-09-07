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

// export const createGuild = async (name: string) => {
//   const response = await fetch("/api/createGuild", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.error);
//   }

//   return data;
// };
