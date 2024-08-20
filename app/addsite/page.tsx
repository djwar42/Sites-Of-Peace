import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import AdminPage from '../../components/AdminPage'

export default function AddSitePage() {
  return (
    <div className='container mx-auto p-4'>
      <header className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Sites of Peace Admin</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
      <SignedIn>
        <AdminPage />
      </SignedIn>
      <SignedOut>
        <p>Please sign in to access the admin panel.</p>
      </SignedOut>
    </div>
  )
}
