import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
const PORT = 3000;

// Middleware para ler JSON no corpo das requisições (POST)
app.use(express.json());

// Registrando o arquivo de rotas separado (Item 4)
app.use('/api', usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});