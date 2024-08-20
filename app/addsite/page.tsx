import { Suspense } from 'react'
import AddSiteForm from '../../components/AddSiteForm'
import SiteManagementList from '../../components/SiteManagementList'
import prisma from '../../lib/prisma'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

type Site = {
  id: string
  title: string
  content: string | null
  favicon: string | null
  url: string
  published: boolean
}

async function getSites(): Promise<Site[]> {
  const sites = await prisma.site.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      favicon: true,
      url: true,
      published: true
    }
  })
  return sites
}

export default async function AdminPage() {
  const sites = await getSites()

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-gradient-to-r from-violet-600 to-indigo-600 text-primary-foreground py-4 px-6'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Sites of Peace Admin</h1>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
      <main className='flex-1 bg-background text-foreground py-8 px-6'>
        <div className='container mx-auto'>
          <SignedIn>
            <h2 className='text-xl font-semibold mb-4'>Add New Site</h2>
            <AddSiteForm />

            <h2 className='text-xl font-semibold mt-8 mb-4'>
              Manage Existing Sites
            </h2>
            <Suspense fallback={<div>Loading sites...</div>}>
              <SiteManagementList initialSites={sites} />
            </Suspense>
          </SignedIn>
          <SignedOut>
            <p>Please sign in to access the admin panel.</p>
          </SignedOut>
        </div>
      </main>
      <footer className='bg-gradient-to-r from-violet-600 to-indigo-600 text-primary-foreground py-4 px-6'>
        <div className='container mx-auto flex items-center justify-center'>
          <p>Sites of Peace Admin</p>
        </div>
      </footer>
    </div>
  )
}
