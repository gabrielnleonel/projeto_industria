import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import produtosRouter from './routes/produtos.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

// Registro de rotas
app.use('/api', usuarioRoutes);
app.use('/api', produtosRouter); 

app.listen(3000, () => {
  console.log('servidor rodando na porta 3000');
});