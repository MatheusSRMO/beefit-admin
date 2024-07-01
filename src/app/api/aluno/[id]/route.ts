import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest } from 'next/types';

// Get aluno
export async function GET(request: NextRequest) {

    const prisma = new PrismaClient();

    try {

        const {searchParams} = new URL(request.url);
        const aluno_id = searchParams.get('id');
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

        return NextResponse.json({
            message: "Aluno encontrado com sucesso.",
            status: 200,
            body: aluno,
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
export async function PUT(request: NextApiRequest) {

    const prisma = new PrismaClient();

    try {

        const aluno_id = request.query;
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

        const req = request.body;
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
        } = req;

        const updatedData: updateAluno = {};
        if(req){
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