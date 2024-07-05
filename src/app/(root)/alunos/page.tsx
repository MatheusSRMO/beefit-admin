"use client";

import { deleteTrainer, getTrainers } from '@/actions/trainer.actions';
import TitleSection from '@/components/custom/title-section'
import TrainerCard from '@/components/custom/trainer-card';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { Aluno } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function StudentPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [trainers, setTrainers] = React.useState<Aluno[]>([]);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    (
      async () => {
        if(!user || !user?.publicMetadata.userId) return;

        setLoading(true);

        const trainers = await getTrainers(user?.publicMetadata.userId! as number);
        if (!trainers) return console.log('Erro ao buscar alunos');

        setTrainers(trainers);
        setLoading(false);
      }
    )();
  }, [user]);

  if (loading) return <main className="min-h-[calc(100vh_-_130px)] flex justify-center items-center">
    <h1 className='text-primary'>Carregando...</h1>
  </main>;

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
        {trainers.map((student, index) => (
          <TrainerCard key={index} {...student} onDelete={async () => {
            setLoading(true);
            try {

              const deletedTrainer = await deleteTrainer(student.id);

              if (!deletedTrainer) return toast({
                title: 'Erro ao deletar aluno',
                description: 'Se um aluno possui treinos, ele não pode ser deletado.',
                variant: "destructive"
              });

              const trainers = await getTrainers(user?.publicMetadata.userId! as number);
              if (!trainers) return console.log('Erro ao buscar alunos');

              setTrainers(trainers);

              toast({
                title: 'Sucesso!',
                description: 'Aluno deletado com sucesso',
              });
            }
            catch (error) {
              console.log(error);

              toast({
                title: 'Erro ao deletar aluno',
                description: 'Tente novamente',
                variant: "destructive"
              });
            }
            finally {
              setLoading(false);
            }
          }} />
        ))}
      </div>
    </main>
  )
}
