"use client";

import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { usePathname, useRouter } from 'next/navigation';

export interface LabelProps{
  href: string
  label: string
  selected?: boolean
}

interface SideBarProps {
  labels: LabelProps[]
  className?: string
}

export default function SideBar({ labels, className }: SideBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  labels = labels.map(label => {
    if (pathname.includes(label.href)) {
      return {
        ...label,
        selected: true
      }
    }
    return label
  })

  return (
    <aside className={cn('h-full w-48 bg-slate-500 bg-gradient-to-t to-[#192C64] from-[#120E44] flex justify-between flex-col items-center py-10 px-10', className)}>
      <div className="w-32 h-32 rounded-full flex justify-center items-center">
        <Image src={Logo} alt="BeeFit logo" width={100} height={200} />
      </div>

      <div className="flex flex-col w-full gap-5">
        {
          labels.map((label, index) => (
            <Button
              key={index}
              variant={label.selected ? "custom" : "link"}
              className='font-semibold text-lg'
              onClick={() => router.push(label.href)}
            >
              {label.label}
            </Button>
          ))
        }
      </div>

      <Button variant="custom" className='w-full'>Sair da conta</Button>

    </aside>
  )
}
