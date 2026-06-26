import { Router } from 'express';
import {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto,
  buscarProdutoPorId
} from '../controllers/produtosController.js'; 

const router = Router();

router.post('/produtos', criarProduto);
router.get('/produtos', listarProdutos);
router.put('/produtos/:id', atualizarProduto);
router.delete('/produtos/:id', deletarProduto);
router.get('/produtos/:id', buscarProdutoPorId);

export default router;