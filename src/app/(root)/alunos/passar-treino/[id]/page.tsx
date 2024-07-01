"use client";

import { getExercises } from '@/actions/exercise.actions';
import { ExerciseCard } from '@/components/custom/exercise-card';
import Profile from '@/components/custom/profile';
import TitleSection from '@/components/custom/title-section';
import { Exercicio } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const url = "https://instagram.fvix7-1.fna.fbcdn.net/v/t51.2885-19/375634600_312526504781364_2872426049815117991_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fvix7-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=UU4VGLQNPygQ7kNvgEtwl1o&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYBW3eewshTs5V5OXI-M7f1uMZpL3BDHlIXuZZ6bhcayEQ&oe=66862B9B&_nc_sid=8f1549"

const exercises = [
  {
    id: 1,
    name: 'Bicep Curl (Dumbbell)',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/02941201-Dumbbell-Biceps-Curl_Upper-Arms.mp4',
    observation: 'Observação do exercício Observação do exercício Observação do exercício Observação do exercícioObservação do exercício Observação do exercício Observação do exercício Observação do exercícioObservação do exercício Observação do exercício Observação do exercício Observação do exercícioObservação do exercício Observação do exercício Observação do exercício Observação do exercícioObservação do exercício Observação do exercício Observação do exercício Observação do exercícioObservação do exercício Observação do exercício Observação do exercício Observação do exercício'
  },
  {
    id: 2,
    name: 'Dumbbell Bench Press Chest',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/02891201-Dumbbell-Bench-Press_Chest.mp4',
    observation: 'Observação'
  },
  {
    id: 3,
    name: 'Barbell Bench Press Chest',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/00251201-Barbell-Bench-Press_Chest.mp4',
    observation: 'Observação'
  },
  {
    id: 4,
    name: 'Dumbbell Flyes Chest',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/07391201-Sled-45-Leg-Press_Hips.mp4',
    observation: 'Observação'
  },
  {
    id: 5,
    name: 'Dumbbell Shoulder Press Shoulders',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/05991201-Lever-Seated-Leg-Curl_Thighs.mp4',
    observation: 'Observação'
  },
  {
    id: 6,
    name: 'Dumbbell Lateral Raise Shoulders',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/03121201-Dumbbell-Hammer-Curl-(version-2)_Upper-Arms.mp4',
    observation: 'Observação'
  },
  {
    id: 7,
    name: 'Dumbbell Front Raise Shoulders',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/00321201-Barbell-Deadlift_Hips-FIX.mp4',
    observation: 'Observação'
  },
  {
    id: 8,
    name: 'Dumbbell Shrugs Shoulders',
    series: 3,
    repetitions: 10,
    weight: 50,
    url: 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/12691201-Cable-Standing-Up-Straight-Crossovers_Chest.mp4',
    observation: 'Observação'
  },
]

export default function MakeTrainingPage() {
  const router = useRouter();

  const [exercises, setExercises] = React.useState<Exercicio[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedExercises, setSelectedExercises] = React.useState<number[]>([]);

  React.useEffect(() => {
    (
      async () => {
        setLoading(true);

        const exercises = await getExercises();

        if(exercises) {
          setExercises(exercises);
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
            <Image src={url}
              width={50}
              height={50}
              className="rounded-full border-2 border-[#528AA5]"
              alt='Imagem de perfil'
            />
            <h1>Andreza</h1>
            <h2>Silva</h2>
          </div>
          <TitleSection.Button
            title="Confirmar"
            onClick={() => {
              router.push('/alunos/cadastrar');
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
