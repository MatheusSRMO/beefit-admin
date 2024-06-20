import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient();
const app = express();

app.get('/alunos', async(req, res) => {
    try{
        const alunos = await prisma.aluno.findMany();
        res.json(alunos);
    } catch (error) {
        res.status(404).json({error: "Alunos não encontrados"});
    }
})