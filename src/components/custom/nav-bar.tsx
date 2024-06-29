import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '../ui/input';
import { BellDotIcon, SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function NavBar() {
  return (
    <div className="fixed right-0 left-60 py-2 pl-20 pr-10 flex  bg-[#1e1558] justify-between">
      <div className="flex justify-center items-center w-1/3 gap-4">
        <Avatar className="h-20 w-20 border-[#528AA5] border-4">
          <AvatarImage src="https://github.com/MatheusSRMO.png" alt="Imagem" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="flex-1 text-3xl font-bold text-primary w-32">Matheus</h1>
          <h1 className="flex-1 text-2xl font-bold text-primary w-64">Ribeiro</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="O que procura?" className='border-none text-primary placeholder:text-primary bg-background w-96' />

        <Button variant="link" size="icon">
          <BellDotIcon className="w-8 h-8 text-primary" />
        </Button>

        <Button variant="link" size="icon">
          <SettingsIcon className="w-8 h-8 text-primary" />
        </Button>

      </div>

    </div>
  )
}
