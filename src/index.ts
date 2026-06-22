import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import produtosRouter from './routes/produtos.js'; // Novo Router adicionado

const app = express();

app.use(express.json());

// Registro de rotas
app.use('/api', usuarioRoutes);
app.use('/api', produtosRouter); // Registrando rotas de produtos

app.listen(3000, () => {
  console.log(`-----------------------------------------`);
  console.log(`[SERVER] Inicializado com sucesso!`);
  console.log(`[STATUS] Monitor de arquivos TSX ativo.`);
  console.log(`[PORTA] Rodando na porta 3000`);
  console.log(`-----------------------------------------`);
});