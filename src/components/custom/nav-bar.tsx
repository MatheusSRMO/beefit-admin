import React from 'react'
import { Input } from '../ui/input';
import { BellDotIcon, SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Profile from './profile';

export default function NavBar() {
  return (
    <div className="fixed right-2 left-60 py-2 pl-20 pr-7 flex z-40 bg-[#1e1558] justify-between rounded-br-3xl">
      <Profile url="https://github.com/MatheusSRMO.png" firstName='Matheus' lastName='Ribeiro' />

      <div className="flex items-center gap-3">
        <Input placeholder="O que procura?" className='border-none text-primary placeholder:text-primary bg-background w-96' />

        <Button variant="link" size="icon">
          <BellDotIcon className="text-primary" />
        </Button>

        <Button variant="link" size="icon">
          <SettingsIcon className="text-primary" />
        </Button>

      </div>

    </div>
  )
}
