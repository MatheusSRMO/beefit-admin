import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

// Get rendimentos
export async function GET(request:NextRequest, {params}: {params: {id: string}}) {
    const prisma = new PrismaClient();

    try {

        const id = params.id;
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de treino inválido.",
                status: 400,
            });
        }

        const existingTreino = await prisma.treino.findUnique({
            where: { id: parseInt(id, 10) },
        })

        if(!existingTreino){
            return NextResponse.json({
                message: "Treino não encontrado.",
                status: 404,
            })
        }

        const today = new Date();
        today.setDate(today.getDate() - today.getDay());
        today.setHours(0,0,0,0);

        // Retorna treinos finalizados, relacionados ao aluno do ID, e que forem finalizados
        // de domingo a hoje
        const rendimento = await prisma.treino.count({
            where: {
                id: parseInt(id, 10),
                finalizado: true,
                updatedAt: { gte: today },
            }
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