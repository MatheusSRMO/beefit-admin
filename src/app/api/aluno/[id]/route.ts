import { clerkClient } from '@clerk/nextjs/server';
import { Prisma, PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

// Get aluno
export async function GET(request: NextRequest) {

    const prisma = new PrismaClient();

    try {

        const {searchParams} = new URL(request.url);
        const aluno_id_clerk = searchParams.get('id');

        if(!aluno_id_clerk ){
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            })
        }

        const aluno_clerk = await clerkClient.users.getUser(aluno_id_clerk);

        const aluno = await prisma.aluno.findUnique({
            where: {
                id: aluno_clerk.publicMetadata.alunoId as number
            }
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