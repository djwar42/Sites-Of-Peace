import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Scraping site:', body)
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const title = $('title').text()
    const description = $('meta[name="description"]').attr('content') || ''

    // Fetch favicon
    let faviconUrl =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '/favicon.ico'

    if (!faviconUrl.startsWith('http')) {
      faviconUrl = new URL(faviconUrl, url).href
    }

    const faviconResponse = await axios.get(faviconUrl, {
      responseType: 'arraybuffer'
    })
    const favicon = Buffer.from(faviconResponse.data, 'binary').toString(
      'base64'
    )

    return NextResponse.json({ title, description, favicon })
  } catch (error) {
    console.error('Error scraping site:', error)
    return NextResponse.json(
      { error: 'Failed to scrape site' },
      { status: 500 }
    )
  }
}
