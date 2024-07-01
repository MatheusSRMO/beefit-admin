declare type TrainerRegisterProps = {
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    goal?: string;
    observation?: string;
    url?: string;
    personalTrainerId: number;
};

declare type Trainer = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    goal?: string | undefined;
    observation?: string;
    url: string;
};

/*
model User {
    id        Int      @id @default(autoincrement())
    clerkId   String   @db.VarChar(100)
    email     String   @unique @db.VarChar(100)
    username  String   @unique @db.VarChar(100)
    photo     String   @db.VarChar(2000)
    firstName String?  @db.VarChar(100)
    lastName  String?  @db.VarChar(100)
    role      String   @default("USER") @db.VarChar(100) // USER | TRAINER | ADMIN
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    alunos    Aluno[]
}

*/
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    photo: string;
    firstName?: string;
    lastName?: string;
    role: string;
};

declare type UpdateUserParams = {
    clerkId?: string;
    email?: string;
    username?: string;
    photo?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
};

declare type CreateExerciseParams = {
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    url: string;
    observation?: string;
    personalTrainerId: number;
};

declare type CreateTrainingParams = {
    studentId: number;
    exercisesIds: number[];
};
