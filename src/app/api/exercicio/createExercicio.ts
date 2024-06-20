import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

app.post('/exercicio', async (req, res) => {
    const { nome, gifLink } = req.body;
    const result = await prisma.exercicio.create({
        data: {
            nome,
            gifLink,
        },
    })
    res.json(result);
});