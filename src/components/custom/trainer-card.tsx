import { Clock3Icon, RulerIcon, TargetIcon, WeightIcon } from "lucide-react";
import Profile from "./profile";
import { Button } from "../ui/button";
import { Aluno } from "@prisma/client";
import Link from "next/link";
import { deleteTrainer } from "@/actions/trainer.actions";


interface TrainerCardProps extends Aluno {
  onDelete: () => void
}

export default function TrainerCard(trainer: TrainerCardProps){
  return (
    <div className="bg-[#1e1558] p-5 rounded-3xl flex justify-between">
      <Profile {...trainer} size='md' />

      {/* faça aqui um lguar onde aparece as informações faltantes, com icones do lucide react */}
      <div className="grid grid-cols-4 w-3/6">
        <div className="flex items-center gap-2">
          <Clock3Icon className='text-primary w-5 h-5' />
          <span className='text-primary'>{trainer.age} anos</span>
        </div>
        <div className="flex items-center gap-2">
          <WeightIcon className='text-primary w-5 h-5' />
          <span className='text-primary'>{trainer.weight} kg</span>
        </div>
        <div className="flex items-center gap-2">
          <RulerIcon className='text-primary w-5 h-5' />
          <span className='text-primary'>{trainer.height} cm</span>
        </div>
        <div className="flex items-center gap-2">
          <TargetIcon className='text-primary w-5 h-5' />
          <span className='text-primary w-32 truncate'>{trainer.goal}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-col">
        {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Editar</button> */}
        <Button variant="custom" asChild>
          <Link href={`/alunos/passar-treino/${trainer.id}`}>Passar treino</Link>
        </Button>
        <Button
          variant="destructive"
          className='rounded-full w-full p-0'
          onClick={trainer.onDelete}
        >
          Excluir
        </Button>
      </div>
    </div>
  )
}