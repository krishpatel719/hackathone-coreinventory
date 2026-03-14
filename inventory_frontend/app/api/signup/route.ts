import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {

    const body = await req.json()

    const djangoResponse = await fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await djangoResponse.json()

    return NextResponse.json(data, { status: djangoResponse.status })

  } catch (error) {

    return NextResponse.json(
      { error: "Signup request failed" },
      { status: 500 }
    )

  }
}