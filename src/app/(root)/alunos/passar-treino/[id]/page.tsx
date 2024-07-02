"use client";

import { getExercises } from '@/actions/exercise.actions';
import { getTrainerById } from '@/actions/trainer.actions';
import { createTraining } from '@/actions/training.actions';
import { ExerciseCard } from '@/components/custom/exercise-card';
import TitleSection from '@/components/custom/title-section';
import { useToast } from '@/components/ui/use-toast';
import { Aluno, Exercicio } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'


export default function MakeTrainingPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();

  const [exercises, setExercises] = React.useState<Exercicio[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedExercises, setSelectedExercises] = React.useState<number[]>([]);
  const [trainer, setTrainer] = React.useState<Aluno | null>(null);

  React.useEffect(() => {
    (
      async () => {
        setLoading(true);

        const exercises = await getExercises();
        const trainer = await getTrainerById(Number(params.id));

        if(exercises && trainer) {
          setExercises(exercises);
          setTrainer(trainer);
        }
        else {
          toast({
            title: 'Erro ao buscar dados',
            description: 'Tente novamente caso o erro persista entre em contato com o suporte.',
            variant: "destructive"
          });
        }

        setLoading(false);
      }
    )();
  }, []);


  if (loading) return <main className="min-h-[calc(100vh_-_130px)] flex justify-center items-center">
    <h1 className='text-primary'>Carregando...</h1>
  </main>;

  return (
    <main className="min-h-[calc(100vh_-_130px)] px-10 pb-10">
      <TitleSection title="Montar treino">
        <div className="flex gap-10 items-center justify-between pb-3">
          {/* <Profile url={url} firstName={"Andreza"} lastName={"Silva"} size='md' /> */}
          <div className="flex text-primary font-bold text-xl space-x-2 justify-center items-center">
            <Image 
              src={trainer?.url || ''}
              width={50}
              height={50}
              className="rounded-full border-2 border-[#528AA5]"
              alt='Imagem de perfil'
            />
            <h1 className='font-extrabold'>
              {trainer?.firstName}
            </h1>
            <h2 className='font-medium'>
              {trainer?.lastName}
            </h2>
          </div>
          <TitleSection.Button
            title="Confirmar"
            onClick={async () => {
              if(selectedExercises.length === 0) return toast({
                title: 'Erro ao cadastrar aluno',
                description: 'Selecione pelo menos um exercício.',
                variant: "destructive"
              });

              setLoading(true);

              try {
                const training = await createTraining({
                  studentId: Number(params.id),
                  exercisesIds: selectedExercises,
                });

                if(!training) return toast({
                  title: 'Erro ao passar treino',
                  description: 'Tente novamente caso o erro persista entre em contato com o suporte.',
                  variant: "destructive"
                });

                toast({
                  title: "Sucesso!",
                  description: "Treino passado com sucesso!",
                });

                setSelectedExercises([]);
              }
              catch (error) {
                console.log(error);
                toast({
                  title: 'Erro ao passar treino',
                  description: 'Tente novamente caso o erro persista entre em contato com o suporte.',
                  variant: "destructive"
                });
              }
              finally {
                setLoading(false);
              }
            }}
          />
        </div>
      </TitleSection>

      <div className="flex flex-wrap gap-10 py-10 justify-center">
        {
          exercises.map(exercise => (
            <ExerciseCard
              onClick={() => {
                if(selectedExercises.includes(exercise.id)) {
                  setSelectedExercises(selectedExercises.filter(id => id !== exercise.id));
                  return;
                }
                setSelectedExercises([...selectedExercises, exercise.id]);
              }}
              key={exercise.id}
              {...exercise}
              className={clsx('border-4 cursor-pointer', {
                'border-green-600': selectedExercises.includes(exercise.id),
              })}
            />
          ))
        }
      </div>
    </main>
  )
}
