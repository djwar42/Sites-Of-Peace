'use client'

import { useState } from 'react'
import Image from 'next/image'

type Site = {
  id: string
  title: string
  content: string | null
  favicon: string | null
  url: string
}

export default function SiteList({ initialSites }: { initialSites: Site[] }) {
  const [sites, setSites] = useState(initialSites)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSites = sites.filter((site) =>
    site.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getFaviconSrc = (favicon: string | null) => {
    if (!favicon) return '/default-favicon.png' // Provide a default favicon
    if (favicon.startsWith('data:image') || favicon.startsWith('http')) {
      return favicon
    }
    return `data:image/png;base64,${favicon}`
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredSites.map((site) => (
          <div
            key={site.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <div className='p-4'>
              <div className='flex items-center mb-2'>
                <Image
                  src={getFaviconSrc(site.favicon)}
                  alt={`${site.title} favicon`}
                  width={28}
                  height={28}
                  className='mr-2'
                />
                <h2 className='text-xl font-semibold'>{site.title}</h2>
              </div>
              <p className='text-gray-600 mb-2'>{site.content || ''}</p>
              <a
                href={site.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                Visit Site
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
