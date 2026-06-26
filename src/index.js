import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import produtosRouter from './routes/produtos.js'; // Novo Router adicionado
import path from 'path';

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

// Registro de rotas
app.use('/api', usuarioRoutes);
app.use('/api', produtosRouter); // Registrando rotas de produtos

app.listen(3000, () => {
  console.log('servidor rodando na porta 3000');
});