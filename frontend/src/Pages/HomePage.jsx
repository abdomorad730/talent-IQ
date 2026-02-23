import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500" onClick={()=>toast.success('hello')}>Home Page</h1>

      <SignedOut>
        <SignInButton mode='modal'>
          Login
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <UserButton />
    </div>
  )
}

export default HomePage
