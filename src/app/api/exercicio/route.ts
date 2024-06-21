import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create exercicio
export async function POST(request:Request) {
    try{

        const json = await request.json();
        let exercicio;
        if(json) {
            const { nome, gifLink } = json;
            exercicio = {
                nome,
                gifLink,
            }
        }

        if( exercicio?.nome === undefined || exercicio.gifLink === undefined ){
            return NextResponse.json({
                message: "Erro ao criar exercicio devido a falta de atributos.",
                status: 400,
            })
        }
        
        const create = await prisma.exercicio.create({
            data: exercicio
        })

        return NextResponse.json({
            message: "Exercicio criado com sucesso.",
            status: 200,
            body: create,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao criar exercicio",
            body: error,
        })
    }
}

// List exercicios
export async function GET(request: Request){
    const exercicios = await prisma.exercicio.findMany();;

    if( exercicios.length === 0 ){
        return NextResponse.json({
            message: "Nenhum exercicio cadastrado no sistema.",
            status: 404,
        })
    } else {
        return NextResponse.json({
            message: "Exercicios buscados com sucesso.",
            status: 200,
            body: exercicios,
        });
    }
}