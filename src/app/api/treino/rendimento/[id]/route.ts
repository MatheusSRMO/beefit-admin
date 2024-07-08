import { getTrainerById } from '@/actions/trainer.actions';
import { clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

// Get rendimentos
export async function GET(request:NextRequest, {params}: {params: {id: string}}) {
    const prisma = new PrismaClient();

    try {

        const aluno_id_clerk = params.id;
        if (typeof aluno_id_clerk !== "string") {
            return NextResponse.json({
                message: "Id de aluno inválido.",
                status: 400,
            });
        }

        const aluno_clerk = await clerkClient.users.getUser(aluno_id_clerk);

        if (!aluno_clerk) {
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            });
        }

        const aluno = await getTrainerById(aluno_clerk.publicMetadata.trainerId as number);

        if (!aluno) {
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            });
        }

        const today = new Date();
        today.setDate(today.getDate() - today.getDay());
        today.setHours(0,0,0,0);

        // Retorna treinos finalizados, relacionados ao aluno do ID, e que forem finalizados
        // de domingo a hoje
        const rendimento = await prisma.treino.count({
            where: {
                alunoId: aluno.id,
                finalizado: true,
                updatedAt: {gte: today},
            },
        })

        if(!rendimento){
            return NextResponse.json({
                message: "Rendimento nao encontrado.",
                status: 404,
            });
        }

        return NextResponse.json({
            message: "Rendimento encontrado com sucesso.",
            status: 200,
            body: rendimento,
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar rendimento.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}