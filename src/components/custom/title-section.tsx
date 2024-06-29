import React from 'react'
import { Button, ButtonProps } from '../ui/button'

export interface TitleSectionProps {
  title: string
  children?: React.ReactNode
}

function ButtonTitleSection({ title, ...props }: ButtonProps & { title: string }) {
  return (
    <Button variant='custom' {...props}>{title}</Button>
  )
}

function TitleSection({ title, children }: TitleSectionProps) {
  return (
    <div className='w-full border-b-2 border-primary px-5 flex items-center'>
      <h1 className='text-primary text-[50px] font-bold flex-1'>{title}</h1>
      {children}
    </div>
  )
}

TitleSection.Button = ButtonTitleSection

export default TitleSection
