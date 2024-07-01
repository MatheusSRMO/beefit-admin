"use server";

import { handleStringfy } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

/*
model Exercicio {
    id         Int               @id @default(autoincrement())
    nome       String            @db.VarChar(100)
    gifLink    String            @db.VarChar(2000)
    repeticoes Int
    series     Int
    peso       Int
    treinos    TreinoExercicio[]
    createdAt  DateTime          @default(now())
    updatedAt  DateTime          @updatedAt
}
*/

export async function createExercise(exercise: CreateExerciseParams) {
    const prisma = new PrismaClient();
  try {
    const exerciseCreated = await prisma.exercicio.create({
        data: {
            nome: exercise.name,
            series: exercise.series,
            repeticoes: exercise.repetitions,
            peso: exercise.weight,
            gifLink: exercise.url,
            observacao: exercise.observation
        }
    });

    return handleStringfy(exerciseCreated);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getExercises() {
    const prisma = new PrismaClient();
    try {
        const exercises = await prisma.exercicio.findMany();
        return handleStringfy(exercises);
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}
