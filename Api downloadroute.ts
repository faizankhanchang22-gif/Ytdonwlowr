import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return Response.json({error: 'URL daal bhai!'})

  const res = await fetch(`https://advanceytdownloader.ytansh038.workers.dev/?url=${url}`)
  const data = await res.json()
  return Response.json(data)
}
