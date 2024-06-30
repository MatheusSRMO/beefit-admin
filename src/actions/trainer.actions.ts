"use server";

import { handleStringfy } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

export async function registerTrainer(trainer: TrainerRegisterProps) {
  const prisma = new PrismaClient();
  try {
    const newTrainer = await prisma.aluno.create({
      data: {
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        age: trainer.age,
        weight: trainer.weight,
        height: trainer.height,
        goal: trainer.goal,
        observation: trainer.observation,
        url: trainer.url
      }
    });

    if(!newTrainer) throw new Error("Error to create new trainer");

    return handleStringfy(newTrainer);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTrainers() {
  const prisma = new PrismaClient();
  try {
    const trainers = await prisma.aluno.findMany();

    if(!trainers) throw new Error("Error to find trainers");

    return handleStringfy(trainers);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTrainerById(id: number) {
  const prisma = new PrismaClient();
  try {
    const trainer = await prisma.aluno.findUnique({
      where: {
        id
      }
    });

    if(!trainer) throw new Error("Error to find trainer");

    return handleStringfy(trainer);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateTrainer(id: number, trainer: TrainerRegisterProps) {
  const prisma = new PrismaClient();
  try {
    const updatedTrainer = await prisma.aluno.update({
      where: {
        id
      },
      data: {
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        age: trainer.age,
        weight: trainer.weight,
        height: trainer.height,
        goal: trainer.goal,
        observation: trainer.observation,
        url: trainer.url
      }
    });

    if(!updatedTrainer) throw new Error("Error to update trainer");

    return handleStringfy(updatedTrainer);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteTrainer(id: number) {
  const prisma = new PrismaClient();
  try {
    const deletedTrainer = await prisma.aluno.delete({
      where: {
        id
      }
    });

    if(!deletedTrainer) throw new Error("Error to delete trainer");

    return handleStringfy(deletedTrainer);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
