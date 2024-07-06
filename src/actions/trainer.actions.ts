"use server";

import { handleStringfy } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getUserById } from "./users.actions";

export async function registerTrainer(trainer: TrainerRegisterProps) {
  const prisma = new PrismaClient();
  try {
    const personalTrainer = await getUserById(trainer.personalTrainerId);

    // gera uma senha aleatória
    const password = Math.random().toString(36).slice(-8);

    // gera um username sendo a primeira letra do primeiro nome e o sobrenome completo
    const username = `${trainer.firstName[0]}${trainer.lastName}`.toLocaleLowerCase().replaceAll(' ', '_');

    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [`${username.replaceAll("_", ".")}@gmail.com`],
      firstName: trainer.firstName,
      lastName: trainer.lastName,
      username: username,
      password: password,
    });

    if(!clerkUser) throw new Error("Error to create new clerk user");

    const newTrainer = await prisma.aluno.create({
      data: {
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        age: trainer.age,
        weight: trainer.weight,
        height: trainer.height,
        goal: trainer.goal,
        observation: trainer.observation,
        url: trainer.url,
        clerkId: clerkUser.id,
        userId: personalTrainer.id
      },
      
    });

    if(!newTrainer) throw new Error("Error to create new trainer");

    await clerkClient.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        trainerId: newTrainer.id,
        personalTrainerId: personalTrainer.id
      },
    });

    return handleStringfy({
      ...newTrainer,
      username,
      password
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTrainers(personalTrainerId: number) {
  const prisma = new PrismaClient();
  try {
    const trainers = await prisma.aluno.findMany({
      where: {
        userId: personalTrainerId
      }
    });

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
        id, 
      },
      include: {
        treinos: {
          include: {
            exercicios: {
              include: {
                exercicio: true
              }
            }
          }
        }
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
