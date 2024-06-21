import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create Alunos
export async function POST(request:Request) {

    try{

        const json = await request.json();
        let aluno;
        if(json) {
            const {nome, email, senha} = json;
            aluno = {
                nome,
                email,
                senha,
            }
        }

        if( aluno?.nome === undefined || aluno.email === undefined || aluno.senha === undefined ){
            return NextResponse.json({
                message: "Erro ao criar aluno devido a falta de atributos.",
                status: 400,
            })
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
            message: "Erro ao editar aluno",
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