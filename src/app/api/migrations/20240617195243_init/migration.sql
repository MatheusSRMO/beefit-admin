-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treino" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Treino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "gifLink" VARCHAR(100) NOT NULL,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlunoToTreino" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExercicioToTreino" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AlunoToTreino_AB_unique" ON "_AlunoToTreino"("A", "B");

-- CreateIndex
CREATE INDEX "_AlunoToTreino_B_index" ON "_AlunoToTreino"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExercicioToTreino_AB_unique" ON "_ExercicioToTreino"("A", "B");

-- CreateIndex
CREATE INDEX "_ExercicioToTreino_B_index" ON "_ExercicioToTreino"("B");

-- AddForeignKey
ALTER TABLE "_AlunoToTreino" ADD CONSTRAINT "_AlunoToTreino_A_fkey" FOREIGN KEY ("A") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToTreino" ADD CONSTRAINT "_AlunoToTreino_B_fkey" FOREIGN KEY ("B") REFERENCES "Treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercicioToTreino" ADD CONSTRAINT "_ExercicioToTreino_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercicio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercicioToTreino" ADD CONSTRAINT "_ExercicioToTreino_B_fkey" FOREIGN KEY ("B") REFERENCES "Treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;
