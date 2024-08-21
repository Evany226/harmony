const baseUrl = "http://localhost:3001/api/friends";
import { auth } from "@clerk/nextjs/server";

export async function getPending() {
  const { getToken } = auth();

  const request = await fetch(baseUrl + "/requests", {
    method: "GET",
    headers: { Authorization: `Bearer ${await getToken()}` },
  }).then((res) => res.json());

  return request;
}
