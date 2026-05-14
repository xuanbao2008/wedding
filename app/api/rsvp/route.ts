import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const appsScriptUrl = process.env.APPS_SCRIPT_URL

    if (!appsScriptUrl) {
      return NextResponse.json(
        { success: false, error: 'Apps Script URL not configured' },
        { status: 500 }
      )
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    const res = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Request timeout' },
        { status: 504 }
      )
    }
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
