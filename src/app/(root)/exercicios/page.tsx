"use client";

import React from 'react'
import TitleSection from '@/components/custom/title-section';
import { useRouter } from 'next/navigation';
import { ExerciseCard } from '@/components/custom/exercise-card';
import { Exercicio } from '@prisma/client';
import { getExercises } from '@/actions/exercise.actions';

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


export default function ExercisePage() {
  const [exercises, setExercises] = React.useState<Exercicio[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();

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
    <main className="min-h-[calc(100vh_-_245px)] px-10 pb-10">
      
      <TitleSection title="Exercícios">
        <TitleSection.Button title="Acidionar Exercício" onClick={() => {
          router.push('/exercicios/adicionar');
        }} />
      </TitleSection>

      <div className="flex flex-wrap gap-10 py-10 justify-center">
        {
          exercises.map((exercise: Exercicio) => (
            <ExerciseCard key={exercise.id} {...exercise} />
          ))
        }
      </div>
    </main>
  )
}
