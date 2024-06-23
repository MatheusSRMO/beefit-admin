import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// http://localhost:3000/api/aluno/aluno?email={email}

interface UpdateAluno {
    nome?: string;
    senha?: string;
}

// Edit Aluno
export async function PUT(request:NextRequest) {
    const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
    try{

        if (typeof email !== 'string') {
            return NextResponse.json({
                message: "Email inválido.",
                status: 400,
            });
        }
        
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

    } catch (error) {
        return NextResponse.json({
            message: "Erro ao editar aluno",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Find Aluno by Email
export async function GET(request:NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    try {

        if (typeof email !== 'string') {
            return NextResponse.json({
                message: `Email inválido.`,
                status: 400,
            });
        }

        const aluno = await prisma.aluno.findUnique({
            where: { email: email },
        })

        if (aluno){
            return NextResponse.json({
                message: `Aluno encontrado com sucesso`,
                status: 200,
                body: aluno,
            })
        } else {
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar aluno",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Delete aluno
export async function DELETE(request:NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    try {

        if (typeof email !== 'string') {
            return NextResponse.json({
                email: email,
                type: typeof(email),
                message: `Email inválido!!. ${email}`,
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
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}