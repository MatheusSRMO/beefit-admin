import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface UpdateExercicio {
    nome?: string;
    gifLink?: string;
}

// Edit Exercicio
export async function PUT(request:NextRequest) {
    try{

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de exercicio inválido." + id,
                status: 400,
            });
        }

        const req = await request.json();
        
        const data: UpdateExercicio = {};
        if(req) {
            const {nome, gifLink} = req;
            if (nome !== undefined) {
                data.nome = nome;
            }
            
            if (gifLink !== undefined) {
                data.gifLink = gifLink;
            }
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json({
                message: "Nenhum item a ser atualizado.",
                status: 400,
            })
        }

        const update = await prisma.exercicio.update({
            where: { id: parseInt(id, 10) },
            data: data,
        })

        return NextResponse.json({
            message: "Exercício atualizado com sucesso.",
            status: 200,
            body: update,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao atualizar exercício.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Find Exercicio by Id
export async function GET(request:NextRequest) {

    try {

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de exercicio inválido.",
                status: 400,
            });
        }

        const exercicio = await prisma.exercicio.findUnique({
            where: { id: parseInt(id, 10) },
        })

        
        if(exercicio){

            return NextResponse.json({
                message: "Exercício encontrado com sucesso.",
                status: 200,
                body: exercicio,
            })
        } else {
            return NextResponse.json({
                message: "Exercício não encontrado.",
                status: 404,
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar exercício.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Delete exercicio
export async function DELETE(request:NextRequest) {
    
    try {

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de exercicio inválido.",
                status: 400,
            });
        }

        await prisma.exercicio.delete({
            where: { id: parseInt(id, 10) },
        })

        return NextResponse.json({
            message: "Exercício deletado com sucesso.",
            status: 200,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao deletar exercício.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}