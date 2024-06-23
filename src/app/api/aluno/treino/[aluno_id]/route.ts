import { PrismaClient } from '@prisma/client'
import { url } from 'inspector';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

//treino/{aluno_id}
// Cria treino já relacionado ao aluno

// Create Treino
export async function POST(request:NextRequest) {
    
    try{
        const {searchParams} = new URL(request.url);
        const aluno_id = searchParams.get('aluno_id');
        if (typeof aluno_id !== 'string') {
            return NextResponse.json({
                message: "Id de aluno inválido.",
                status: 400,
            });
        }
        const id = parseInt(aluno_id, 10);
        
        const aluno = await prisma.aluno.findUnique({
            where: { id: id },
        });
        
        if(!aluno){
            return NextResponse.json({
                message: "Aluno não encontrado",
                status: 404,
            })
        }
        
        const json = await request.json();
        const { exercicios } = json;

        if (!exercicios || !Array.isArray(exercicios) || exercicios.length === 0) {
            return NextResponse.json({
                message: "Erro ao criar treino devido à falta de exercícios.",
                status: 400,
            });
        }

        const treino = {
            exercicios: exercicios,
            aluno_id: id,
        }

        if( treino?.exercicios.length === 0 || treino === undefined ){
            return NextResponse.json({
                message: "Erro ao criar treino.",
                status: 400,
            })
        }
        
        const create = await prisma.treino.create({
            data: treino
        })

        return NextResponse.json({
            message: "Treino criado com sucesso.",
            status: 200,
            body: create,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao criar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// List Treinos by aluno
export async function GET(request: NextRequest){

    try{

        const {searchParams} = new URL(request.url);
        const aluno_id = searchParams.get('aluno_id');
        if (typeof aluno_id !== 'string') {
            return NextResponse.json({
                message: "Id de aluno inválido.",
                status: 400,
            });
        }
        const aluno = await prisma.aluno.findUnique({
            where: { id: parseInt(aluno_id, 10) },
        })
        if(!aluno){
            return NextResponse.json({
                message: "Aluno não encontrado",
                status: 404,
            })
        }

        const treinos = await prisma.treino.findMany({
            where: {aluno_id : parseInt(aluno_id, 10)}
        })

        if( treinos.length === 0 ){
            return NextResponse.json({
                message: "Nenhum treino do aluno cadastrado no sistema.",
                status: 404,
            })
        } else {
            return NextResponse.json({
                message: "Treinos do aluno buscados com sucesso.",
                status: 200,
                body: treinos,
            });
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}