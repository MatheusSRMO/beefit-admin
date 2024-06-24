import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

// http://localhost:3000/api/aluno/finalizaTreino/a?id={id}

// Create FinalizaTreino
export async function POST(request: NextRequest) {
    try {
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
        const create = await prisma.calendario.create({
            data: {
                aluno_id: aluno.id,
                data: today,
            }
        })

        return NextResponse.json({
            message: "Treino finalizado com sucesso.",
            status: 200,
            body: create,
        });

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao finalizar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// List FinalizaTreino Mês (Calendário)
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
                data: { gte: today }
            }
        })

        if( calendario.length === 0 ){
            return NextResponse.json({
                message: "Nenhuma finalização cadastrada no sistema.",
                status: 404,
            })
        } else {
            return NextResponse.json({
                message: "Finalizações buscadas com sucesso.",
                status: 200,
                body: calendario,
            });
        }

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

// Deleta Fizalização
export async function DELETE(request: NextRequest){
    
    try{
        const {searchParams} = new URL(request.url);
        const final_id = searchParams.get('id');
        if (typeof final_id !== 'string') {
            return NextResponse.json({
                message: "Id de finalização inválido.",
                status: 400,
            });
        }
        const id = parseInt(final_id, 10);

        await prisma.calendario.delete({
            where: {id: id}
        })

        return NextResponse.json({
            message: "Finalização deletada com sucesso.",
            status: 200,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao deletar finalizações",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });

    } finally {
        await prisma.$disconnect();
    }
}