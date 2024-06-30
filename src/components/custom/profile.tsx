import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from 'clsx';
import { Aluno } from '@prisma/client';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export interface ProfileProps {
  size?: 'md' | 'lg'
  url?: string | null
  firstName: string
  lastName: string
}

export default function Profile({ url, firstName, lastName, size = 'lg' }: ProfileProps) {
  console.log(url);
  return (
    <div className="flex justify-center items-center max-w-1/3 min-w-44 gap-4">

      {
        size === 'md' ? (
          <Image
            src={url || ''}
            alt="Imagem"
            width={100}
            height={100}
            className="border-[#528AA5] border-4 rounded-full h-16 w-16"
          />
        ) : (
          <div className='w-20 h-20'>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
                elements: {
                  avatarBox: {
                    width: '100%',
                    height: '100%',
                    border: '4px solid #528AA5',
                  }
                }
              }} />
            </SignedIn>
          </div>
        )
      }

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
    </div >
  )
}
