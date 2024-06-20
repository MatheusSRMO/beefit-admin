import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

interface UpdateData {
    gifLink?: string;
}
    
app.put('/aluno/:id', async (req, res) => {
    const { id } = req.params;
    const { gifLink } = req.body;
    
    const data: UpdateData = {};
    
    if (nome !== undefined) {
        data.gifLink = gifLink;

    } else {
        return res.status(400).json({ error: 'Nenhum campo para atualizar' });

    }
    
    try {
        const update = await prisma.exercicio.update({
        where: { id: id },
        data: data,
        });
        res.json(update);
    } catch (error) {
        res.status(404).json({ error: 'Aluno não encontrado' });
    }
});