import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Count Rendimentos semana (Calendário)
export async function GET(request: NextRequest){
    
    try{
        const {searchParams} = new URL(request.url);
        const aluno_id = searchParams.get('aluno_id');
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

        const today = new Date();
        today.setDate(today.getDate() - today.getDay());
        today.setHours(0, 0, 0, 0);

        const calendario = await prisma.calendario.findMany({
            where: {
                aluno_id: id,
                data: {gte: today}
            }
        })

        return NextResponse.json({
            message: "Finalizações buscadas com sucesso.",
            status: 200,
            body: calendario.length,
        });

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar finalizações",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });

    } finally {
        await prisma.$disconnect();
    }
}