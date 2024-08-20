'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Input
      type='text'
      placeholder='Search websites...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className='bg-primary-foreground text-primary px-4 py-2 rounded-md'
    />
  )
}
