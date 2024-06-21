import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface UpdateExercicio {
    nome?: string;
    gifLink?: string;
}

// Edit Exercicio
export async function PUT(request:NextApiRequest) {
    const id = request.query;
    try{

        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de exercício inválida.",
                status: 400,
            });
        }
        
        const req = await request.body;
        
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
            where: { id: id },
            data: data,
        })

        return NextResponse.json({
            message: "Exercício atualizado com sucesso.",
            status: 200,
            body: update,
        })

    } catch(error){
        return NextResponse.json({
            message: "Erro ao atualizar exercício",
            body: error,
        })
    }
}

// Find Exercicio by Id
export async function GET(request:NextApiRequest) {
    const id = request.query;

    try {

        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de exercício inválida.",
                status: 400,
            });
        }

        const exercicio = await prisma.exercicio.findUnique({
            where: { id: id },
        })

        return NextResponse.json({
            message: "Exercício encontrado com sucesso.",
            status: 200,
            body: exercicio,
        })
        
    } catch(error) {
        return NextResponse.json({
            message: "Erro ao buscar exercício.",
            body: error,
        })
    }
}

// Delete exercicio
export async function DELETE(request:NextApiRequest) {
    const id = request.query;
    
    try {

        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id de exercício inválida.",
                status: 400,
            });
        }

        await prisma.exercicio.delete({
            where: { id: id },
        })

        return NextResponse.json({
            message: "Exercício deletado com sucesso.",
            status: 200,
        })

    } catch (error) {

        return NextResponse.json({
            message: "Erro ao deletar exercício",
            body: error,
        })
    }
}