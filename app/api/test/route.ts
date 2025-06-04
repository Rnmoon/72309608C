import { NextResponse } from "next/server"

/**
 * Test endpoint to verify the API is working
 */
export async function GET() {
  return NextResponse.json({ status: "API is running" })
}
