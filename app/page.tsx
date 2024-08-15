'use client'

import Image from 'next/image'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const websites = [
    {
      domain: 'www.example.com',
      favicon: '/placeholder.svg',
      description: 'A simple example website with a clean and modern design.'
    },
    {
      domain: 'www.acme.com',
      favicon: '/placeholder.svg',
      description:
        'The official website of Acme Corporation, featuring their latest products and services.'
    },
    {
      domain: 'www.techblog.com',
      favicon: '/placeholder.svg',
      description:
        'A technology blog covering the latest trends and innovations in the industry.'
    },
    {
      domain: 'www.ecommerce.shop',
      favicon: '/placeholder.svg',
      description:
        'An e-commerce platform offering a wide range of products for online shopping.'
    },
    {
      domain: 'www.design-studio.com',
      favicon: '/placeholder.svg',
      description:
        'A design studio showcasing the work of talented artists and designers.'
    },
    {
      domain: 'www.travel-guide.com',
      favicon: '/placeholder.svg',
      description:
        'A comprehensive travel guide with information on destinations, hotels, and activities.'
    }
  ]
  const filteredWebsites = websites.filter((website) =>
    website.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gradient-to-r from-violet-600 to-indigo-600 text-primary-foreground py-4 px-6'>
        <div className='container mx-auto flex items-center'>
          <h1 className='text-2xl font-bold'>Sites Of Peace</h1>
          <div className='ml-auto'>
            <Input
              type='text'
              placeholder='Search websites...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='bg-primary-foreground text-primary px-4 py-2 rounded-md'
            />
          </div>
        </div>
      </header>
      <main className='flex-1 bg-background text-foreground py-8 px-6'>
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {filteredWebsites.map((website, index) => (
            <div
              key={index}
              className='bg-card text-card-foreground rounded-md shadow-md p-4 flex items-center'
            >
              <img
                src='/placeholder.svg'
                alt={`${website.domain} favicon`}
                width={32}
                height={32}
                className='mr-4'
                style={{ aspectRatio: '32/32', objectFit: 'cover' }}
              />
              <div>
                <h3 className='text-lg font-medium'>{website.domain}</h3>
                <p className='text-sm text-muted-foreground'>
                  {website.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className='bg-gradient-to-r from-violet-600 to-indigo-600 text-primary-foreground py-4 px-6'>
        <div className='container mx-auto flex items-center justify-center'>
          <p>Sites Of Peace</p>
        </div>
      </footer>
    </div>
  )
}
