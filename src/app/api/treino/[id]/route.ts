import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

interface UpdateTreino {
    exercicios?: Int32Array;
}

// Edit Treino
export async function PUT(request:NextRequest) {

    try{

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de treino inválido.",
                status: 400,
            });
        }

        const treino = await prisma.treino.findUnique({
            where: {id: parseInt(id, 10)},
        });

        if(!treino){
            return NextResponse.json({
                message: "Treino não encontrado.",
                status: 404,
            });
        }

        const req = await request.json();
        const exercicios = req.exercicios;

        if (exercicios.length === 0 || exercicios === undefined) {
            return NextResponse.json({
                message: "Nenhum item a ser atualizado.",
                status: 400,
            })
        }

        const update = await prisma.treino.update({
            where: { id: parseInt(id, 10) },
            data: {
                exercicios: exercicios,
            }
        })

        return NextResponse.json({
            message: "Treino atualizado com sucesso.",
            status: 200,
            body: update,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao editar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Find Treino by Id
export async function GET(request:NextRequest) {

    try {

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de treino inválido.",
                status: 400,
            });
        }

        const treino = await prisma.treino.findUnique({
            where: { id: parseInt(id, 10) },
        })

        if(treino){

            return NextResponse.json({
                message: "Treino encontrado com sucesso.",
                status: 200,
                body: treino,
            })
        } else {
            return NextResponse.json({
                message: "Treino não encontrado.",
                status: 404,
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Delete Treino
export async function DELETE(request:NextRequest) {

    try {

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de treino inválido.",
                status: 400,
            });
        }

        await prisma.treino.delete({
            where: { id: parseInt(id, 10) },
        })

        return NextResponse.json({
            message: "Treino deletado com sucesso.",
            status: 200,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao deletar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}