"use client";

import Profile from '@/components/custom/profile';
import TitleSection from '@/components/custom/title-section'
import { Button } from '@/components/ui/button';
import { Clock3Icon, RulerIcon, TargetIcon, Weight, WeightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const students = [
  {
    id: '1',
    firstName: 'Andreza',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '2',
    firstName: 'João',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Bulk',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '3',
    firstName: 'Maria',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Aumento de massa magra',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '4',
    firstName: 'José',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '5',
    firstName: 'Ana',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '6',
    firstName: 'Pedro',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '7',
    firstName: 'Paulo',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '8',
    firstName: 'Carlos',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '9',
    firstName: 'Lucas',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
  {
    id: '10',
    firstName: 'Joaquim',
    lastName: 'Silva',
    age: 21,
    weight: 60,
    height: 1.65,
    goal: 'Emagrecimento',
    url: 'https://avatars.githubusercontent.com/u/66279500?v=4'
  },
]

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  url: string;
}

function StudentCard(student: Student) {
  const router = useRouter();
  return (
    <div className="bg-[#1e1558] p-5 rounded-3xl flex justify-between">
      <Profile {...student} size='md' />

      {/* faça aqui um lguar onde aparece as informações faltantes, com icones do lucide react */}
      <div className="grid grid-cols-4 w-3/6">
        <div className="flex items-center gap-2">
          <Clock3Icon className='text-primary w-5 h-5' />
          <span className='text-primary'>{student.age} anos</span>
        </div>
        <div className="flex items-center gap-2">
          <WeightIcon className='text-primary w-5 h-5' />
          <span className='text-primary'>{student.weight} kg</span>
        </div>
        <div className="flex items-center gap-2">
          <RulerIcon className='text-primary w-5 h-5' />
          <span className='text-primary'>{student.height} cm</span>
        </div>
        <div className="flex items-center gap-2">
          <TargetIcon className='text-primary w-5 h-5' />
          <span className='text-primary w-32 truncate'>{student.goal}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-col">
        {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Editar</button> */}
        <Button  variant="custom" asChild>
          <Link href={`/alunos/passar-treino/${student.id}`}>Passar treino</Link>
        </Button>
        <Button variant="destructive" className='rounded-full w-full p-0'>Excluir</Button>
      </div>
    </div>
  )
}

export default function StudentPage() {
  const router = useRouter();
  return (
    <main className="min-h-[calc(100vh_-_130px)] px-10 pb-10">
      <TitleSection title="Alunos">
        <TitleSection.Button
          title="Adicionar Aluno"
          onClick={() => {
            router.push('/alunos/cadastrar');
          }}
        />
      </TitleSection>

      <div className="mt-10 space-y-8">
        {students.map((student, index) => (
          <StudentCard key={index} {...student} />
          // <div className="bg-[#1e1558] p-5 rounded-3xl flex justify-between">
          //   <Profile key={index} {...student} />
          //   <div className="flex items-center gap-2 flex-col">
          //     {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Editar</button> */}
          //     <Button variant="custom">Passar treino</Button>
          //     <Button variant="destructive" className='rounded-full w-full p-0'>Excluir</Button>
          //   </div>
          // </div>
        ))}
      </div>

    </main>
  )
}
