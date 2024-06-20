import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

interface UpdateData {
    nome?: string;
    senha?: string;
}

app.put('/aluno/:email', async (req, res) => {
    const { email } = req.params;
    const { nome, senha } = req.body;
    
    const data: UpdateData = {};
    
    if (nome !== undefined) {
        data.nome = nome;
    }
    
    if (senha !== undefined) {
        data.senha = senha;
    }

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }
    
    try {
        const update = await prisma.aluno.update({
        where: { email: email },
        data: data,
        });
        res.json(update);
    } catch (error) {
        res.status(404).json({ error: 'Aluno não encontrado' });
    }
});