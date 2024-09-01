import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (request.method === "POST") {
    const { getToken } = auth();
    const id = params.id;
    const baseUrl = `http://localhost:3001/api/conversations/${id}/message`;

    try {
      const { message } = await request.json();

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          content: message,
        }),
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
      console.error("Error in accept request route handler:", error);
      return NextResponse.json(
        { error: "Error in accept request route handler:" + error },
        { status: 500 }
      );
    }
  }
}
