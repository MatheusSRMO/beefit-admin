import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Logo from '../../public/logo.png'

interface SideBarProps {
    className?: string
}

export default function SideBar({ className }: SideBarProps) {
  return (
    <div className={cn('h-full w-48 bg-slate-500 rounded-r-[50px] bg-gradient-to-t to-[#192C64] from-[#120E44] flex justify-between flex-col items-center py-10', className)}>
        <div className="w-32 h-32 rounded-full flex justify-center items-center">
            <Image src={Logo} alt="BeeFit logo" width={100} height={200}/>
        </div>

        <div className="bg-red-300">
            options
        </div>

        <Button variant={"custom"} className='w-9/12'>Sair da conta</Button>

    </div>
  )
}
