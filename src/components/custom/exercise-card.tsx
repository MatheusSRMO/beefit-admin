import { DumbbellIcon, RefreshCcwDotIcon, Repeat2Icon } from "lucide-react";
import VideoComponent from "./video";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

export function ExerciseCard({ name, series, repetitions, weight, url, observation, className, onClick }: { name: string, series: number, repetitions: number, weight: number, url: string, observation: string, className?: string, onClick?: () => void}) {
  return (
    <div className={cn("bg-[#192C64] shadow-md rounded-3xl p-5 w-64 h-auto border-[#528AA5] border flex flex-col justify-between", className)} onClick={onClick}>
      <h1 className="text-lg font-semibold text-primary truncate text-center">{name}</h1>

      <div className="mt-4 flex flex-col items-center">
        <VideoComponent url={url} />
        <div className="text-sm text-gray-300 flex gap-5 mt-3">
          <p className='flex gap-1 items-center'>{series} <Repeat2Icon className='w-4 h-4 text-primary' /></p>
          <p className='flex gap-1 items-center'>{repetitions} <RefreshCcwDotIcon className='w-4 h-4 text-primary' /></p>
          <p className='flex gap-1 items-center'>{weight}kg <DumbbellIcon className='w-4 h-4 text-primary' /></p>
        </div>
      </div>
      <ScrollArea className="mt-3 h-32">
        <p className="text-sm text-gray-300">{observation}</p>
      </ScrollArea>
    </div>
  );
}