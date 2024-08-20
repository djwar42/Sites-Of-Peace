'use client'

import { useState } from 'react'
import Image from 'next/image'

type Site = {
  id: string
  title: string
  content: string | null
  favicon: string | null
  url: string
  published: boolean
}

export default function SiteManagementList({
  initialSites
}: {
  initialSites: Site[]
}) {
  const [sites, setSites] = useState(initialSites)
  const [editingSite, setEditingSite] = useState<Site | null>(null)

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/addsite/delete/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setSites(sites.filter((site) => site.id !== id))
      } else {
        console.error('Failed to delete site')
      }
    } catch (error) {
      console.error('Error deleting site:', error)
    }
  }

  const handleEdit = (site: Site) => {
    setEditingSite(site)
  }

  const handleSave = async (site: Site) => {
    try {
      const response = await fetch(`/addsite/update/${site.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(site)
      })
      if (response.ok) {
        setSites(sites.map((s) => (s.id === site.id ? site : s)))
        setEditingSite(null)
      } else {
        console.error('Failed to update site')
      }
    } catch (error) {
      console.error('Error updating site:', error)
    }
  }

  const getFaviconSrc = (favicon: string | null) => {
    if (!favicon) return '/default-favicon.png' // Provide a default favicon
    if (favicon.startsWith('data:image') || favicon.startsWith('http')) {
      return favicon
    }
    return `data:image/png;base64,${favicon}`
  }

  return (
    <div className='space-y-4'>
      {sites.map((site) => (
        <div key={site.id} className='bg-white shadow-md rounded-lg p-4'>
          {editingSite?.id === site.id ? (
            <div className='space-y-2'>
              <input
                type='text'
                value={editingSite.title}
                onChange={(e) =>
                  setEditingSite({ ...editingSite, title: e.target.value })
                }
                className='w-full p-2 border rounded'
                placeholder='Title'
              />
              <textarea
                value={editingSite.content || ''}
                onChange={(e) =>
                  setEditingSite({ ...editingSite, content: e.target.value })
                }
                className='w-full p-2 border rounded'
                placeholder='Content'
              />
              <input
                type='url'
                value={editingSite.url}
                onChange={(e) =>
                  setEditingSite({ ...editingSite, url: e.target.value })
                }
                className='w-full p-2 border rounded'
                placeholder='URL'
              />
              <input
                type='text'
                value={editingSite.favicon || ''}
                onChange={(e) =>
                  setEditingSite({ ...editingSite, favicon: e.target.value })
                }
                className='w-full p-2 border rounded'
                placeholder='Favicon URL or Base64 (optional)'
              />
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => handleSave(editingSite)}
                  className='bg-green-500 text-white px-4 py-2 rounded'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingSite(null)}
                  className='bg-gray-300 text-black px-4 py-2 rounded'
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className='flex items-center mb-2'>
                <Image
                  src={getFaviconSrc(site.favicon)}
                  alt={`${site.title} favicon`}
                  width={16}
                  height={16}
                  className='mr-2'
                />
                <h3 className='text-lg font-semibold'>{site.title}</h3>
              </div>
              <p className='text-gray-600 mb-2'>{site.content || ''}</p>
              <a
                href={site.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline mb-2 block'
              >
                {site.url}
              </a>
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => handleEdit(site)}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(site.id)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
