import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//used to send post request to server to send friend request
export async function POST(request: Request) {
  const baseUrl = "http://localhost:3001/api/friends";
  const { getToken } = auth();

  try {
    const { username } = await request.json();

    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in friend request route handler:", error);
    return NextResponse.json(
      { error: "Error in friend request route handler:" + error },
      { status: 500 }
    );
  }
}
