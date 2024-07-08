"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ChevronDownIcon, ClockIcon, DumbbellIcon, Users2Icon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TextColored(string: string) {
  return <span className="text-[#90CAFF]">{string}</span>;
}

const GradientDiv = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full h-[500px] max-w-screen-sm opacity-30 absolute -z-10", className)} style={{
      background: "radial-gradient(#192C64 30%, transparent 70%)"
    }} />
  )
};

export default function Home() {
  const { toast } = useToast();

  return (
    <ScrollArea className="w-full">

      <section className="w-full bg-gradient-to-b from-[#192C64] to-background">
        <nav className="w-full flex justify-end max-w-screen-lg mx-auto items-center gap-5 p-5">
          <SignedIn>
            <Button variant="custom" className="text-black" asChild>
              <Link href="/alunos">
                Acessar Dashboard
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button variant="custom" className="text-black" asChild>
              <Link href="/sign-in">
                Entrar
              </Link>
            </Button>
            <Button variant="custom" className="text-black" asChild>
              <Link href="/sign-up">
                Criar conta
              </Link>
            </Button>
          </SignedOut>
        </nav>

        <div className="max-w-screen-lg mx-auto min-h-[85vh] flex justify-start items-center flex-col gap-10 p-5">
          <Image src="/logo.png" alt={""} width={350} height={350} className="mt-16 md:mt-32 w-3/4 md:w-1/2 lg:w-1/3" />
          <div className="text-white text-4xl md:text-5xl font-bold text-center">
            <p>
              Transforme {TextColored("treinos")}
            </p>
            <p className="relative">
              em {TextColored("resultados")} com o {" "}
              <span className="relative">
                BeeFit
                <Image src="/eclipse.png" alt={""} width={200} height={200} className="absolute top-0 right-0 scale-[1.3] hidden md:block" />
              </span>
            </p>
          </div>
        </div>
        {/* Botão para indicar que tem mais conteudo */}
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-white text-white"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
            }}
          >
            <ChevronDownIcon className="w-5 h-5 animate-bounce" />
          </Button>
        </div>
      </section>

      <div className="w-full my-16 flex justify-center px-5">
        <Image src="/bee-line.png" alt={""} width={1491} height={147} />
      </div>

      <div className="max-w-screen-lg mx-auto w-full p-5 text-center">
        <h1 className="text-white font-bold text-4xl md:text-5xl">Sobre o BeeFit</h1>
        <p className="text-lg text-white mt-10">
          O <span className="font-bold text-primary">BeeFit</span> é a solução para os professores e academias que desejam empregar a tecnologia para melhorar o <span className="text-primary">desempenho</span> dos seus alunos durante o treino.
        </p>
        <p className="text-lg text-white">
          Com o nosso sistema, o aluno terá, no seu próprio celular, todas as informações necessárias para fazer uma <span className="text-primary">execução eficiente</span>. Já o professor, conseguirá acompanhar cada vez mais alunos, de maneira <span className="text-primary">remota e produtiva</span>.
        </p>
      </div>

      <div className="mt-32 text-center">
        <h1 className="text-white font-bold text-3xl md:text-4xl">Nossa solução</h1>
        <p className="text-lg text-[#90CAFF] font-bold">para professores</p>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto mt-10 justify-between items-start relative pr-5 px-5 gap-10">
        <div className="w-full md:w-[576px]">
          <AspectRatio ratio={16 / 9}>
            <Image src="/screenshot-1.png" fill alt="" />
          </AspectRatio>
        </div>
        <div className="w-full md:w-[592px] pt-5">
          <h1 className="text-white font-bold text-xl">
            <ClockIcon className="w-5 h-5 inline-block" /> {" "}
            Interface intuitiva e eficiente
          </h1>
          <p className="text-white mt-5 font-light text-xl text-justify">
            Cada profissional terá acesso a um painel, onde conseguirá visualizar seus alunos cadastrados e passar treinos com exercícios que atendam a sua necessidade.
          </p>
          <p className="text-white mt-5 font-light text-xl text-justify">
            O painel conta com uma interface intuitiva, de forma que nossos clientes consigam realizar as ações necessárias de forma rápida e prática.
          </p>
        </div>
        {<GradientDiv className="hidden lg:block scale-150 w-full h-[900px]" />}
      </div>

      <div className="flex flex-col-reverse lg:flex-row md:flex-row w-full max-w-screen-xl mx-auto mt-44 justify-between items-start relative pl-5 px-5 gap-10">
        <div className="w-full md:w-[592px] pt-5">
          <h1 className="text-white font-bold text-xl">
            <DumbbellIcon className="w-5 h-5 inline-block" /> {" "}
            Um banco de execícios compartilhado
          </h1>
          <p className="text-white mt-5 font-light text-xl text-justify">
            Apesar de cada profissional ter um conjunto próprio de alunos, todos os nossos clientes compartilham um mesmo banco de exercícios.
          </p>
          <p className="text-white mt-5 font-light text-xl text-justify">
            Dessa maneira, o professor pode escolher um exercício já pronto para adicionar ao treino ou pode optar por criar um novo exercício, com o conteúdo que desejar.
          </p>
        </div>
        <div className="w-full md:w-[576px]">
          <AspectRatio ratio={16 / 9}>
            <Image src="/screenshot-2.png" fill alt="" />
          </AspectRatio>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto mt-44 justify-between items-start relative pr-5 px-5 gap-10">
        <div className="w-full md:w-[576px]">
          <AspectRatio ratio={16 / 9}>
            <Image src="/screenshot-3.png" fill alt="" />
          </AspectRatio>
        </div>
        <div className="w-full md:w-[592px] pt-5">
          <h1 className="text-white font-bold text-xl">
            <UsersIcon className="w-5 h-5 inline-block" /> {" "}
            Acompanhe seu aluno remotamente
          </h1>
          <p className="text-white mt-5 font-light text-xl text-justify">
            Visualize e analise as informações de cada aluno, com o intuito  de criar o melhor treino para cada tipo de corpo.
          </p>
          <p className="text-white mt-5 font-light text-xl text-justify">
            Além disso, é possível acompanhar o ritmo de treinos de cada pessoa, assim como seu desempenho nos exercícios passados.
          </p>
        </div>
        <GradientDiv className="hidden lg:block -ml-52 lg:scale-125 -mt-24 w-[1000px] " />
      </div>

      <div className="mt-32 text-center">
        <h1 className="text-white font-bold text-3xl md:text-4xl">Nossa solução</h1>
        <p className="text-lg text-[#90CAFF] font-bold">para alunos</p>
      </div>

      <div className="w-full flex justify-center mt-20 flex-col max-w-screen-lg items-center mx-auto p-5">
        <Image src="/smartphone-screenshots.png" width={715} height={506} alt="" className="w-full object-contain" />

        <p className="text-white mt-20 text-xl font-light text-center">
          Tenha acesso aos seus treinos pelo celular.
          Com o aplicativo, é possível estabelecer uma meta de quantos dias deseja treinar ao longo da semana e verificar seu rendimento. Além disso, é possível visualizar os dias em que finalizou um treino a partir de um calendário.
        </p>
      </div>

      <div className="mt-32 text-center">
        <h1 className="text-white font-bold text-3xl md:text-4xl">Conheça nosso sistema</h1>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center mt-20 max-w-screen-lg items-center mx-auto gap-48 lg:gap-10 mb-48 p-5">
        <div className="backdrop-blur-sm bg-[#192C64]/30 w-full md:w-96 h-96 flex justify-center items-center flex-col px-5 gap-10 rounded-3xl relative">
          {/* Botão para fazer login ou criar conta */}
          <SignedIn>
            <Button variant="custom" className="text-black w-full" asChild>
              <Link href="/alunos">
                Acessar Dashboard
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button variant="custom" className="text-black w-full" asChild>
              <Link href="/sign-in">
                Entrar
              </Link>
            </Button>
            <Button variant="custom" className="text-black w-full" asChild>
              <Link href="/sign-up">
                Criar conta
              </Link>
            </Button>
          </SignedOut>

          <div className="absolute -bottom-20 w-36">
            <span className="relative text-white text-3xl font-bold text-center">
              Professor
            </span>
            <Image src="/eclipse.png" alt={""} width={200} height={200} className="absolute -top-3 right-0 scale-[1.3]" />
          </div>
        </div>

        <div className="backdrop-blur-sm bg-[#192C64]/30 w-full md:w-96 h-96 flex justify-center items-center flex-col px-5 gap-10 rounded-3xl relative">
          {/* Botão para fazer login ou criar conta */}
          <Button
            variant="custom"
            className="text-black w-full"
            onClick={() => {
              toast({
                title: "Desculpe!",
                description: "Em breve, disponível para Android e iOS",
                variant: "destructive",
              });
            }}
          >
            Baixar App
          </Button>


          <div className="absolute -bottom-20 w-36 text-center">
            <span className="relative text-white text-3xl font-bold text-center">
              Aluno
            </span>
            <Image src="/eclipse.png" alt={""} width={200} height={200} className="absolute -top-3 right-0 scale-[1.3]" />
          </div>
        </div>
      </div>

      <footer className="h-24 bg-blue-500/5 w-full mt-24 rounded-t-3xl mx-auto max-w-screen-lg p-5">
        <div className="flex-col justify-between items-center h-full">
          <p className="text-white text-center">© {(new Date().getUTCFullYear())} BeeFit</p>
          <p className="text-white text-center">Desenvolvido com ❤️ por <span className="text-primary font-bold">Matheus S.R. - Gabriella S.B. - Murilo S.D.</span></p>
        </div>
      </footer>

    </ScrollArea>
  );
}
