import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = PrismaClient();

// Create Alunos
export async function POST(request:Request) {

    try{

        const data = await request.json();
        let aluno;
        if(data) {
            const {nome, email, senha} = data;
            aluno = {
                nome,
                email,
                senha,
            }
        }
        
        const create = await prisma.aluno.create({
            data: aluno
        })

        return NextResponse.json({
            message: "Aluno criado com sucesso.",
            status: 200,
            body: create,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao criar aluno",
            body: error,
        })
    }
}

// List Alunos
export async function GET(request: Request){
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
}