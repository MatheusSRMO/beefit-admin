import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

// Finaliza Treino
export async function PUT(request:NextRequest) {

    const prisma = new PrismaClient();

    try {

        const {searchParams} = new URL(request.url);
        const treino_id = searchParams.get('id');
        if (typeof treino_id !== 'string') {
            return NextResponse.json({
                message: "Id de treino inválido.",
                status: 400,
            });
        }
        const id = parseInt(treino_id, 10);

        const treino = await prisma.treino.findUnique({
            where: { id: id },
        });

        if( !treino ){
            return NextResponse.json({
                message: "Treino não encontrado.",
                status: 404,
            });
        }

        treino.updatedAt = new Date();
        treino.finalizado = true;

        const treinoUpdate = await prisma.treino.update({
            where: { id: id},
            data : treino,
        });

        return NextResponse.json({
            message: "Treino finalizado com sucesso.",
            status: 200,
            body: treinoUpdate,
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao finalizar treino.",
            status: 500,
            body: error instanceof Error ? error.message : String(error),
        })
    } finally {
        await prisma.$disconnect();
    }
}