import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create Alunos
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const { nome, email, senha } = json;

        if (!nome || !email || !senha) {
            return NextResponse.json({
                message: "Erro ao criar aluno devido à falta de atributos.",
                status: 400,
            });
        }

        const aluno = {
            nome,
            email,
            senha,
        };

        const create = await prisma.aluno.create({
            data: aluno,
        });

        return NextResponse.json({
            message: "Aluno criado com sucesso.",
            status: 200,
            body: create,
        });

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao criar aluno",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// List Alunos
export async function GET(request: Request){
    
    try{
        const alunos = await prisma.aluno.findMany();;

        if( alunos.length === 0 ){
            return NextResponse.json({
                message: "Nenhum aluno cadastrado no sistema.",
                status: 404,
            })
        } else {
            return NextResponse.json({
                message: "Alunos buscados com sucesso.",
                status: 200,
                body: alunos,
            });
        }

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar alunos",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });

    } finally {
        await prisma.$disconnect();
    }
}