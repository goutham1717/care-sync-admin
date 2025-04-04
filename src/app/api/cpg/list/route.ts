
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = { content: "Hello World" }
  return NextResponse.json(response);
}