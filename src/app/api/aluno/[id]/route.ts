import { Prisma, PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

// Get aluno
export async function GET(request: NextRequest) {

    const prisma = new PrismaClient();

    try {

        const {searchParams} = new URL(request.url);
        const aluno_id = searchParams.get('id');
        if (typeof aluno_id !== 'string') {
            return NextResponse.json({
                message: "Id de aluno inválido.",
                status: 400,
            });
        }
        const id = parseInt(aluno_id, 10);

        const aluno = await prisma.aluno.findUnique({
            where: {id: id}
        })
        if( !aluno ){
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            })
        }

        return NextResponse.json({
            message: "Aluno encontrado com sucesso.",
            status: 200,
            body: aluno,
        })

    } catch (error) { 
        return NextResponse.json({
            message: "Erro ao buscar treinos.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
    
}