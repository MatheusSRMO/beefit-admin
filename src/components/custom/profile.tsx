import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from 'clsx';

export interface ProfileProps {
  size?: 'md' | 'lg'
  url: string
  firstName: string
  lastName: string   
}

export default function Profile({ url, firstName, lastName, size = 'lg' }: ProfileProps) {
  return (
    <div className="flex justify-center items-center max-w-1/3 min-w-44 gap-4">
      <Avatar className={clsx("border-[#528AA5] border-4", {
        'h-16 w-16': size === 'md',
        'h-20 w-20': size === 'lg',
      })}>
        <AvatarImage src={url} alt="Imagem" />
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className={clsx("flex-1 font-bold text-primary max-w-32", {
          'text-2xl': size === 'md',
          'text-3xl': size === 'lg',
        })}>{firstName}</h1>
        <h2 className={clsx("flex-1 text-2xl font-bold text-primary max-w-64", {
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
        })}>{lastName}</h2>
      </div>
    </div>
  )
}
