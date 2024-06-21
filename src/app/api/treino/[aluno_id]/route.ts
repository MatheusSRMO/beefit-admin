import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

//treino/{aluno_id}
// Cria treino já relacionado ao aluno

// Create Treino
export async function POST(request:NextApiRequest) {
    
    try{
        const aluno_id = request.query;
        let id;
        // if (aluno_id) id = parseInt(aluno_id, 10);

        const aluno = await prisma.aluno.findUnique({
            where: { id: id },
        })
        if(!aluno){
            return NextResponse.json({
                message: "Aluno não encontrado",
                status: 404,
            })
        }
        
        const json = await request.body;
        let treino;
        if(json) {
            const { exercicios } = json;
            treino = {
                exercicios,
            }
        }

        if( aluno?.exercicios.length === 0 ){
            return NextResponse.json({
                message: "Erro ao criar treino devido a falta de exercicios.",
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
export async function GET(request: NextApiRequest){

    try{
        const aluno_id = request.query;

        const aluno = await prisma.aluno.findUnique({
            where: { id: aluno_id },
        })
        if(aluno === undefined){
            return NextResponse.json({
                message: "Aluno não encontrado",
                status: 404,
            })
        }

        const treinos = await prisma.treino.findMany({
            where: {aluno_id : aluno_id}
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
    }  catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar treino.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}