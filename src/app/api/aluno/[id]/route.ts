import { getTrainerById } from "@/actions/trainer.actions";
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// Get aluno pelo idCLerk
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const prisma = new PrismaClient();

    try {
        const aluno_id_clerk = params.id;
        if (typeof aluno_id_clerk !== "string") {
            return NextResponse.json({
                message: "Id de aluno inválido.",
                status: 400,
            });
        }

        const aluno_clerk = await clerkClient.users.getUser(aluno_id_clerk);

        if (!aluno_clerk) {
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            });
        }

        const aluno = await getTrainerById(aluno_clerk.publicMetadata.trainerId as number);

        if (!aluno) {
            return NextResponse.json({
                message: "Aluno não encontrado.",
                status: 404,
            });
        }

        return NextResponse.json({
            message: "Aluno encontrado com sucesso.",
            status: 200,
            body: aluno,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Erro ao buscar aluno.",
            body: error instanceof Error ? error.message : String(error),
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}
