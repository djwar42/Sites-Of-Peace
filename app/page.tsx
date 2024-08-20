import { Suspense } from 'react'
import SiteList from '../components/SiteList'
import SearchBar from '../components/SearchBar'
import prisma from '../lib/prisma'

type Site = {
  id: string
  title: string
  content: string | null
  favicon: string | null
  url: string
}

async function getSites(): Promise<Site[]> {
  const sites = await prisma.site.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      content: true,
      favicon: true,
      url: true
    }
  })
  return sites
}

export default async function Home() {
  const sites = await getSites()

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gradient-to-r from-violet-600 to-indigo-600 text-primary-foreground py-4 px-6'>
        <div className='container mx-auto flex items-center'>
          <h1 className='text-2xl font-bold'>Sites Of Peace</h1>
          <div className='ml-auto'>
            <SearchBar />
          </div>
        </div>
      </header>
      <main className='flex-1 bg-background text-foreground py-8 px-6'>
        <div className='text-center mb-[50px] italic'>
          Sites of peace is an index of websites that promote peace worldwide.
        </div>
        <div className='container mx-auto'>
          <Suspense fallback={<div>Loading...</div>}>
            <SiteList initialSites={sites} />
          </Suspense>
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
