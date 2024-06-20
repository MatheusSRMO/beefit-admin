import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

app.delete('/aluno/:email', async(req, res) => {
    const { email } = req.params;
    try {
        await prisma.aluno.delete({
            where: { email: email },
        })
        res.json(`Aluno deletado com sucesso`);
    } catch (error) {
        res.status(404).json({error: `Aluno com email ${email} não está cadastrado`});
    }
})