import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const allExercicios = await prisma.exercicio.findMany();

    if( allExercicios.length === 0 )
        console.log("No exercicio found on database.");
    else    
        console.log(allExercicios);
    
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })