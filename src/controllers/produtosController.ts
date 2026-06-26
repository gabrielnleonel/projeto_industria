import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. CRIAR PRODUTO (POST)
export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, quantidade, tipoMadeira } = req.body;

    if (!nome || quantidade === undefined || !tipoMadeira) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        quantidade: Number(quantidade),
        tipoMadeira
      }
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao salvar o produto no banco." });
  }
};

// 2. LISTAR TODOS OS PRODUTOS (GET)
export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar produtos do banco." });
  }
};

// 3. BUSCAR PRODUTO POR ID (GET por ID)
export const buscarProdutoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produtoId = Number(id);

    const produto = await prisma.produto.findUnique({
      where: { id: produtoId }
    });

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar o produto." });
  }
};

// 4. ATUALIZAR PRODUTO (PUT)
export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, tipoMadeira } = req.body;
    const produtoId = Number(id);

    // Verifica primeiro se o produto existe no banco
    const existeProduto = await prisma.produto.findUnique({
      where: { id: produtoId }
    });

    if (!existeProduto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    // Atualiza apenas os campos enviados na requisição
    const produtoAtualizado = await (prisma.produto as any).update({
      where: { id: produtoId },
      data: {
        nome: nome || undefined,
        quantidade: quantidade !== undefined ? Number(quantidade) : undefined,
        tipoMadeira: tipoMadeira || undefined
      }
    });

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar o produto." });
  }
};

// 5. DELETAR PRODUTO (DELETE)
export const deletarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produtoId = Number(id);

    // Verifica primeiro se o produto existe no banco
    const existeProduto = await prisma.produto.findUnique({
      where: { id: produtoId }
    });

    if (!existeProduto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    await prisma.produto.delete({
      where: { id: produtoId }
    });

    return res.status(204).send(); // No Content exigido
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar o produto." });
  }
};

export const criarMateriaPrima = async (req: Request, res: Response) => {
  try {
    const { nome, estoque_m3, custo_m3 } = req.body;

    const novaMateria = await prisma.materiaPrima.create({
      data: {
        nome,
        estoque_m3: Number(estoque_m3),
        custo_m3: Number(custo_m3)
      }
    });

    return res.status(201).json(novaMateria);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao cadastrar matéria-prima." });
  }
};