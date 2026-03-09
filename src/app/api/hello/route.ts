import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from Next.js API Route!",
    timestamp: new Date().toISOString(),
    method: "GET"
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: "Data received successfully!",
    data: body,
    timestamp: new Date().toISOString(),
    method: "POST"
  });
}
