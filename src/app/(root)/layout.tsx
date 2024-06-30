"use client";

import React from 'react'
import SideBar from "@/components/custom/side-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavBar from "@/components/custom/nav-bar";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <SideBar className="h-full w-72 z-50" labels={[
        {
          href: "/alunos",
          label: "Alunos",
        },
        {
          href: "/exercicios",
          label: "Exercícios",
        },
      ]} />
      <ScrollArea className="h-full flex-1">
        <NavBar />
        <div className="flex-1 mt-28">
          {
            pathname.split("/").length > 2 && (

              <Button variant='link' onClick={() => router.back()} className='absolute mt-5'>
                <ArrowBigLeft className='w-4 h-4 text-primary' />
              </Button>
            )
          }
          {children}
        </div>
      </ScrollArea>
    </>
  )
}
