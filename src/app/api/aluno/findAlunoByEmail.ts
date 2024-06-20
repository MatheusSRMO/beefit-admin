import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient();
const app = express();

app.get('/aluno/:email', async(req, res) => {
    const {email} = req.params;
    try{
        const aluno = await prisma.aluno.findUnique({
            where: {email: email},
        })
        res.json(aluno);
    } catch (error) {
        res.status(404).json({error: "Aluno não encontrado"});
    }
})