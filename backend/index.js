const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// ROTA 1: Encurtar (O que o botão do React chama)
app.post('/encurtar', async (req, res) => {
  const { urlOriginal } = req.body;
  
  // Se não enviar URL, dá erro
  if (!urlOriginal) return res.status(400).json({ error: "URL é obrigatória" });

  const hash = nanoid(6); // gera o código curto

  try {
    const novoLink = await prisma.link.create({
      data: {
        urlOriginal: urlOriginal,
        urlEncurtada: hash,
      },
    });
    res.json(novoLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar no banco" });
  }
});

// ROTA 2: Redirecionar (O que acontece quando clicam no link curto)
app.get('/:hash', async (req, res) => {
  const { hash } = req.params;

  const link = await prisma.link.findUnique({
    where: { urlEncurtada: hash },
  });

  if (link) {
    // Opcional: incrementar cliques
    await prisma.link.update({
      where: { id: link.id },
      data: { cliques: link.cliques + 1 },
    });
    return res.redirect(link.urlOriginal);
  }

  res.status(404).send("<h1>Link não encontrado!</h1>");
});

// ROTA DE DEBUG (A que você testou e funcionou)
app.get('/debug', async (req, res) => {
  try {
    const contagem = await prisma.link.count();
    res.json({ mensagem: "Banco conectado!", links: contagem });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Servidor Full Stack rodando na porta ${PORT}`));