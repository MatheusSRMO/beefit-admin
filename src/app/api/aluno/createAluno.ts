import { PrismaClient } from '@prisma/client'
import { appendBaseUrl } from 'expo-router/build/fork/getPathFromState'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

app.post('/aluno', async (req, res) => {
    const { nome, email, senha } = req.body;
    const result = await prisma.aluno.create({
        data: {
            nome,
            email,
            senha,
        },
    })
    res.json(result);
});