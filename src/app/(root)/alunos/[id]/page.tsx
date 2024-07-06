"use client";

import { getTrainerById } from '@/actions/trainer.actions';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { formatDateBr } from '@/lib/utils';
import { Aluno, Treino, TreinoExercicio } from '@prisma/client';
import React from 'react'

export default function TrainerPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [trainer, setTrainer] = React.useState<Aluno & { treinos: (Treino & {exercicios: TreinoExercicio[]})[] } | null>(null);


  React.useEffect(() => {
    (
      async () => {
        const trainer = await getTrainerById(Number(params.id));
        if (!trainer) {
          toast({
            title: 'Erro ao buscar aluno',
            description: 'Tente novamente mais tarde, caso o erro persista, entre em contato com o suporte.',
            variant: 'destructive',
          });
          return;
        }
        setTrainer(trainer);
      }
    )();
  }, [params.id]);

  console.log(trainer);

  if (!trainer) return <main className="min-h-[calc(100vh_-_130px)] flex justify-center items-center">
    <h1 className='text-primary'>Carregando...</h1>
  </main>;

  return (
    <main className="min-h-[calc(100vh_-_130px)] px-10 pb-10 flex items-start pt-20">
      <div className="h-[calc(100vh_-_230px)] w-96 mr-10 bg-[#1e1558] p-10 rounded-3xl">
        <h1 className="text-primary text-2xl font-bold">Aluno: {trainer.firstName} {trainer.lastName}</h1>
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="mt-5 space-y-5 w-full">
            <div>
              <h1 className="text-primary font-bold">Nome</h1>
              <p className="text-primary">{trainer.firstName} {trainer.lastName}</p>
            </div>
            <div>
              <h1 className="text-primary font-bold">Idade</h1>
              <p className="text-primary">{trainer.age} anos</p>
            </div>
            <div>
              <h1 className="text-primary font-bold">Peso</h1>
              <p className="text-primary">{trainer.weight} kg</p>
            </div>
            <div>
              <h1 className="text-primary font-bold">Altura</h1>
              <p className="text-primary">{trainer.height} cm</p>
            </div>
            <div>
              <h1 className="text-primary font-bold">Meta</h1>
              <p className="text-primary">{trainer.goal}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h1 className="text-primary text-xl font-bold">Informações de Treino</h1>
        <ScrollArea className="mt-5 h-[calc(100vh_-_280px)] w-full gap-5 pr-5">
          {
            trainer.treinos.length! === 0 ? (
              <div className="h-20 mb-5 bg-[#1e1558] rounded-full flex justify-around text-primary items-center font-semibold">
                <h1>
                  Nenhum treino cadastrado
                </h1>
              </div>
            ) : (
              trainer.treinos.slice().reverse().map((treino, index) => (
                <div key={index} className="h-20 mb-5 bg-[#1e1558] rounded-full flex justify-around text-primary items-center font-semibold">
                  {/* Data do treino (createdAt) */}
                  <h1>
                    {formatDateBr(treino.createdAt)}
                  </h1>

                  {/* quantidade de exercídios */}
                  <p>
                    {treino.exercicios.length} exercícios
                  </p>

                  {/* finalizado */}
                  <p>
                    {treino.finalizado ? 'Finalizado' : 'Em andamento'}
                  </p>

                  {/* data finalizado (updatedAt) */}
                  <p>
                    {treino.finalizado ? formatDateBr(treino.updatedAt) : '-'}
                  </p>

                </div>
              ))
            )
          }
          <ScrollBar />
        </ScrollArea>
      </div>
    </main>
  )
}
