import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

// Get mais velho não finalizado por aluno
export async function GET(request: NextRequest, {params}: {params : {id: string}}) {

    const prisma = new PrismaClient();

    try {

        const aluno_id = params.id;
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

        const monday = new Date()
        monday.setDate(monday.getDate() - monday.getDay());
        monday.setHours(0,0,0,0);

        const treinos = await prisma.treino.findFirstOrThrow({
            where: {
                alunoId: id,
                finalizado: false,
                createdAt: {gte: monday},
            },
        })
        if(!treinos){
            return NextResponse.json({
                message: "Treinos de aluno não encontrados.",
                status: 404,
            })
        }

        return NextResponse.json({
            message: "Treinos de aluno encontrado com sucesso.",
            status: 200,
            body: treinos,
        })

    } catch (error) { 
        return NextResponse.json({
            message: "Erro ao buscar treinos.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }   
}


interface updateAluno {
    firstName?:     string;
    lastName?:      string;
    age?:           number;
    weight?:        number;
    height?:        number;
    goal?:          string;
    observation?:   string;
    url?:           string;
    updatedAt?:     Date; 
}

// edit Aluno
export async function PUT(request: NextRequest, {params}: {params : {id: string}}) {

    const prisma = new PrismaClient();

    try {

        const aluno_id = params.id;
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

        const bodyData = await request.json();
        const {
            firstName,
            lastName,
            age,
            weight,
            height,
            goal,
            observation,
            url,
            updatedAt, 
        } = bodyData;

        const updatedData: updateAluno = {};
        if(bodyData){
            if (firstName !== undefined) updatedData.firstName = firstName;
            if (lastName !== undefined) updatedData.lastName = lastName;
            if (age !== undefined) updatedData.age = age;
            if (weight !== undefined) updatedData.weight = weight;
            if (height !== undefined) updatedData.height = height;
            if (goal !== undefined) updatedData.goal = goal;
            if (observation !== undefined) updatedData.observation = observation;
            if (url !== undefined) updatedData.url = url;
            if (updatedAt !== undefined) updatedData.updatedAt = updatedAt;
        }

        if (Object.keys(updatedData).length === 0) {
            return NextResponse.json({
                message: "Nenhum item a ser atualizado.",
                status: 400,
            })
        }

        const updatedAluno = await prisma.aluno.update({
            where: { id: id },
            data: updatedData,
        })

        return NextResponse.json({
            message: "Aluno editado com sucesso.",
            status: 200,
            body: updatedAluno,
        })

    } catch (error) { 
        return NextResponse.json({
            message: "Erro ao buscar treinos.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }   
}