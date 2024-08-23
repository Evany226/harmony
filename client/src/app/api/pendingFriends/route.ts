import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = "http://localhost:3001/api/friends/pending";
  const { getToken } = auth();

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
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
    console.log("Error in friend request route handler:" + error);
    return NextResponse.json(
      { error: "Error in friend request route handler:" + error },
      { status: 500 }
    );
  }
}
