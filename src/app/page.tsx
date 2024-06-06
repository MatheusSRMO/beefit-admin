import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen p-20">
      <div className="flex flex-row justify-center items-center w-1/3 gap-4">
        <Avatar className="h-20 w-20 border-[#528AA5] border-4">
          <AvatarImage src="https://github.com/jjakob10.png" alt="Imagem" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="flex-1 text-4xl font-bold text-[#FFDC98] w-32">Johann</h1>
          <h1 className="flex-1 text-3xl font-bold text-[#FFDC98] w-64">Jakob</h1>
        </div>
      </div>
    </main>
  );
}
