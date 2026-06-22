import { Request, Response } from 'express';

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  tipoMadeira: string;
}

// Banco de dados em memória simulado para produtos
let produtos: Produto[] = [
  { id: 1, nome: "Tora de Eucalipto", quantidade: 150, tipoMadeira: "Eucalipto" },
  { id: 2, nome: "Prancha de Pinus", quantidade: 80, tipoMadeira: "Pinus" }
];

export const criarProduto = (req: Request, res: Response) => {
  const { nome, quantidade, tipoMadeira } = req.body;

  if (!nome || quantidade === undefined || !tipoMadeira) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const novoProduto: Produto = {
    id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
    nome,
    quantidade: Number(quantidade),
    tipoMadeira
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

export const listarProdutos = (req: Request, res: Response) => {
  res.status(200).json(produtos);
};

export const atualizarProduto = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, quantidade, tipoMadeira } = req.body;
  const produtoId = Number(id);

  const produto = produtos.find(p => p.id === produtoId);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  if (nome) produto.nome = nome;
  if (quantidade !== undefined) produto.quantidade = Number(quantidade);
  if (tipoMadeira) produto.tipoMadeira = tipoMadeira;

  res.status(200).json(produto);
};

export const deletarProduto = (req: Request, res: Response) => {
  const { id } = req.params;
  const produtoId = Number(id);

  const index = produtos.findIndex(p => p.id === produtoId);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos.splice(index, 1);
  res.status(204).send(); // No Content exigido
};

export const buscarProdutoPorId = (req: Request, res: Response) => {
  const { id } = req.params;
  const produtoId = Number(id);

  const produto = produtos.find(p => p.id === produtoId);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.status(200).json(produto);
};