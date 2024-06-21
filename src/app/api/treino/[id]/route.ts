import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface UpdateTreino {
    exercicios?: Int32Array;
}

// Edit Treino
export async function PUT(request:NextApiRequest) {
    const id = request.query;
    try{

        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id inválido.",
                status: 400,
            });
        }
        
        const req = await request.body;
        
        const data: UpdateTreino = {};
        if(req) {
            const {exercicios} = req;
            if (exercicios.length > 0) {
                data.exercicios = exercicios;
            }
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json({
                message: "Nenhum item a ser atualizado.",
                status: 400,
            })
        }

        const update = await prisma.treino.update({
            where: { id: id },
            data: data,
        })

        return NextResponse.json({
            message: "Treino atualizado com sucesso.",
            status: 200,
            body: update,
        })

    } catch(error){
        return NextResponse.json({
            message: "Erro ao editar treino",
            body: error,
        })
    }
}

// Find Treino by Id
export async function GET(request:NextApiRequest) {
    const id = request.query;

    try {

        if (typeof id !== 'string') {
            return NextResponse.json({
                message: "Id inválido.",
                status: 400,
            });
        }

        const treino = await prisma.treino.findUnique({
            where: { id: id },
        })

        return NextResponse.json({
            message: "Treino encontrado com sucesso.",
            status: 200,
            body: treino,
        })
        
    } catch(error) {
        return NextResponse.json({
            message: "Erro ao buscar treino.",
            body: error,
        })
    }
}

// Delete Treino
export async function DELETE(request:NextApiRequest) {
    const email = request.query;
    
    try {

        if (typeof email !== 'string') {
            return NextResponse.json({
                message: "Email inválido.",
                status: 400,
            });
        }

        await prisma.aluno.delete({
            where: { email: email },
        })

        return NextResponse.json({
            message: "Aluno deletado com sucesso.",
            status: 200,
        })

    } catch (error) {

        return NextResponse.json({
            message: "Erro ao deletar aluno",
            body: error,
        })
    }
}