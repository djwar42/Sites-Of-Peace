'use client'

import Image from 'next/image'

type Site = {
  id: string
  title: string
  content: string | null
  favicon: string | null
  url: string
}

export default function SiteList({ initialSites }: { initialSites: Site[] }) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {initialSites.map((site) => (
          <div
            key={site.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <div className='p-4'>
              <div className='flex items-center mb-2'>
                {site.favicon ? (
                  <Image
                    src={`data:image/png;base64,${site.favicon}`}
                    alt={`${site.title} favicon`}
                    width={28}
                    height={28}
                    className='mr-2'
                  />
                ) : (
                  <div className='w-5 h-5 rounded-full bg-gray-400 mr-2'></div>
                )}
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
