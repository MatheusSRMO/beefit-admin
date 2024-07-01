"use server";

import { handleStringfy } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

export async function createTraining(training: CreateTrainingParams) {
    const prisma = new PrismaClient();
    try {
        const trainingCreated = await prisma.treino.create({
            data: {
                aluno: {
                    connect: {
                        id: training.studentId,
                    },
                },
                finalizado: false,
            },
        });

        await Promise.all(
            training.exercisesIds.map(async (exerciseId) => {
                await prisma.treinoExercicio.create({
                    data: {
                        treino: {
                            connect: {
                                id: trainingCreated.id,
                            },
                        },
                        exercicio: {
                            connect: {
                                id: exerciseId,
                            },
                        },
                    },
                });
            })
        );

        const trainingUpdated = await prisma.treino.findUnique({
            where: {
                id: trainingCreated.id,
            },
            include: {
                aluno: true,
                exercicios: {
                    include: {
                        exercicio: true,
                    },
                },
            },
        });

        return handleStringfy(trainingUpdated);
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}
