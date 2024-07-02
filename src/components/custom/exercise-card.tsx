import { DumbbellIcon, RefreshCcwDotIcon, Repeat2Icon } from "lucide-react";
import VideoComponent from "./video";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Exercicio } from "@prisma/client";


interface ExerciseCardProps extends Exercicio {
  onClick?: () => void
  className?: string
}


export function ExerciseCard(exercise : ExerciseCardProps) {
  return (
    <div className={cn("bg-[#192C64] shadow-md rounded-3xl p-5 w-64 h-auto border-[#528AA5] border flex flex-col justify-between", exercise.className)} onClick={exercise.onClick}>
      <h1 className="text-lg font-semibold text-primary truncate text-center">{exercise.nome}</h1>

      <div className="mt-4 flex flex-col items-center">
        <VideoComponent url={exercise.gifLink} />
        <div className="text-sm text-gray-300 flex gap-5 mt-3">
          <p className='flex gap-1 items-center'>{exercise.series} <Repeat2Icon className='w-4 h-4 text-primary' /></p>
          <p className='flex gap-1 items-center'>{exercise.repeticoes} <RefreshCcwDotIcon className='w-4 h-4 text-primary' /></p>
          <p className='flex gap-1 items-center'>{exercise.peso}kg <DumbbellIcon className='w-4 h-4 text-primary' /></p>
        </div>
      </div>
      <ScrollArea className="mt-3 h-32">
        <p className="text-sm text-gray-300">{exercise.observacao}</p>
      </ScrollArea>
    </div>
  );
}