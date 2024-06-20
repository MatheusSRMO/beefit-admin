import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

app.delete('/exercicio/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await prisma.exercicio.delete({
            where: { id: id },
        })
        res.json(`Exercício deletado com sucesso`);
    } catch (error) {
        res.status(404).json({error: `Exercício não encontrado`});
    }
})