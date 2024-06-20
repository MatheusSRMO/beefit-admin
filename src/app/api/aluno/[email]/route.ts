import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = PrismaClient();

interface UpdateAluno {
    nome?: string;
    senha?: string;
}

// Edit Aluno
export async function PUT(request:NextRequest) {
    const email = request.headers;
    try{
        const req = await request.json();
        
        const data: UpdateAluno = {};
        if(req) {
            const {nome, senha} = req;
            if (nome !== undefined) {
                data.nome = nome;
            }
            
            if (senha !== undefined) {
                data.senha = senha;
            }
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json({
                message: "Nenhum item a ser atualizado.",
                status: 400,
            })
        }

        const update = await prisma.aluno.update({
            where: { email: email },
            data: data,
        })

        return NextResponse.json({
            message: "Aluno atualizado com sucesso.",
            status: 200,
            body: update,
        })

    } catch(error){
        return NextResponse.json({
            message: "Erro ao criar aluno",
            body: error,
        })
    }
}

// Find Aluno by Email
export async function GET(request:Request) {
    const email = request.headers;

    try {

        const aluno = await prisma.aluno.findUnique({
            where: { email: email },
        })

        return NextResponse.json({
            message: "Aluno encontrado com sucesso",
            status: 200,
            body: aluno,
        })
        
    } catch(error) {
        return NextResponse.json({
            message: "Erro ao buscar aluno",
            body: error,
        })
    }
}

// Delete aluno
export async function DELETE(request:Request) {
    const email = request.headers;
    
    try {

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