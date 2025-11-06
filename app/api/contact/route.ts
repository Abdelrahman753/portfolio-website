import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const target = process.env.NEXT_PUBLIC_API_GATEWAY_URL
    if (!target) {
      return NextResponse.json({ message: 'API Gateway URL not configured on server' }, { status: 500 })
    }

    const body = await req.text()

    const res = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const text = await res.text()

    const responseHeaders = new Headers()
    const contentType = res.headers.get('content-type')
    if (contentType) responseHeaders.set('content-type', contentType)

    return new NextResponse(text, { status: res.status, headers: responseHeaders })
  } catch (err) {
    console.error('Proxy error:', err)
    return NextResponse.json({ message: 'Proxy failed', error: String(err) }, { status: 500 })
  }
}
