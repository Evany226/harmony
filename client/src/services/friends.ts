import { auth } from "@clerk/nextjs/server";

//client side methods that gets data from route handlers in the server

// export async function getPending() {
//   const { getToken } = auth();

//   const request = await fetch(baseUrl + "/requests", {
//     method: "GET",
//     headers: { Authorization: `Bearer ${await getToken()}` },
//   }).then((res) => res.json());

//   return request;
// }

export async function sendFriendRequest(username: string) {
  try {
    const response = await fetch("/api/friendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    return response.json();
  } catch (error) {
    console.log("Failed to send friend request", error);
  }
}
