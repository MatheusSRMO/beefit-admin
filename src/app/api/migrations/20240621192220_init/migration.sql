/*
  Warnings:

  - You are about to drop the `_AlunoToTreino` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExercicioToTreino` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aluno_id` to the `Treino` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AlunoToTreino" DROP CONSTRAINT "_AlunoToTreino_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlunoToTreino" DROP CONSTRAINT "_AlunoToTreino_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExercicioToTreino" DROP CONSTRAINT "_ExercicioToTreino_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExercicioToTreino" DROP CONSTRAINT "_ExercicioToTreino_B_fkey";

-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "treinos" INTEGER[];

-- AlterTable
ALTER TABLE "Treino" ADD COLUMN     "aluno_id" INTEGER NOT NULL,
ADD COLUMN     "exercicios" INTEGER[];

-- DropTable
DROP TABLE "_AlunoToTreino";

-- DropTable
DROP TABLE "_ExercicioToTreino";
