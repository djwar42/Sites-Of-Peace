'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddSiteForm() {
  const [siteUrl, setSiteUrl] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [favicon, setFavicon] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const normalizeUrl = (input: string): string => {
    let normalized = input.trim().toLowerCase()

    // Prepend 'https://' if no protocol is specified
    if (
      !normalized.startsWith('http://') &&
      !normalized.startsWith('https://')
    ) {
      normalized = 'https://' + normalized
    }

    // Append '/' if there's no path
    try {
      const urlObject = new URL(normalized)
      if (urlObject.pathname === '') {
        normalized += '/'
      }
    } catch (error) {
      // If URL is invalid, we'll catch it in handleScrape
    }

    return normalized
  }

  const handleScrape = async () => {
    setError('')
    const normalizedUrl = normalizeUrl(siteUrl)

    console.log(normalizedUrl)
    try {
      //new URL(normalizedUrl) // This will throw an error if the URL is invalid

      const response = await fetch('/addsite/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl })
      })

      if (response.ok) {
        const data = await response.json()
        setTitle(data.title)
        setContent(data.description)
        setUrl(normalizedUrl)
        setFavicon(data.favicon)
      } else {
        setError('Failed to scrape site')
      }
    } catch (error) {
      setError('Invalid URL. Please enter a valid URL.')
      console.error('Error scraping site:', error)
    }
  }

  const resetForm = () => {
    setSiteUrl('')
    setTitle('')
    setContent('')
    setUrl('')
    setFavicon('')
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/addsite/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, url, favicon })
      })
      if (response.ok) {
        resetForm()
        // Instead of navigating, we'll refresh the current page
        router.refresh()
        // Optionally, you can add a success message here
        // setSuccessMessage('Site added successfully!')
      } else {
        setError('Failed to add site')
      }
    } catch (error) {
      setError('Error adding site')
      console.error('Error adding site:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && <div className='text-red-500'>{error}</div>}
      <div className='flex space-x-2'>
        <input
          type='text'
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder='Enter site URL'
          className='flex-grow p-2 border rounded'
          disabled={isLoading}
        />
        <button
          type='button'
          onClick={handleScrape}
          className='bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400'
          disabled={isLoading}
        >
          Go
        </button>
      </div>
      <div>
        <label htmlFor='title' className='block mb-2'>
          Title
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='w-full p-2 border rounded'
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor='content' className='block mb-2'>
          Content
        </label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full p-2 border rounded'
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor='url' className='block mb-2'>
          URL
        </label>
        <input
          type='url'
          id='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className='w-full p-2 border rounded'
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor='favicon' className='block mb-2'>
          Favicon (Base64)
        </label>
        <input
          type='text'
          id='favicon'
          value={favicon}
          onChange={(e) => setFavicon(e.target.value)}
          className='w-full p-2 border rounded'
          disabled={isLoading}
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className='animate-spin inline-block mr-2'>⭐</span>
            Adding Site...
          </>
        ) : (
          'Add Site'
        )}
      </button>
    </form>
  )
}
