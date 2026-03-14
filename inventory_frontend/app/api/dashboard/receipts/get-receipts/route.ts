import { NextResponse } from "next/server"

export async function GET() {

  try {

    const res = await fetch(
      "http://127.0.0.1:8000/api/receipts/get-receipts/"
    )

    const data = await res.json()

    return NextResponse.json(data)

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch receipts" },
      { status: 500 }
    )

  }
}