import { Router, type Request, type Response } from 'express';

const router = Router();

const usuarios = [
  { id: 1, nome: "Gabriel Leonel", perfil: "GERENTE" },
  { id: 2, nome: "Neymar Jr", perfil: "OPERADOR" }
];
 
router.get('/usuarios', (req: Request, res: Response) => {
  res.status(200).json(usuarios);
});

router.get('/usuarios/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const usuarioId = id ? parseInt(String(id)) : NaN;

  if (isNaN(usuarioId)) {
    return res.status(400).json({ erro: "ID inválido fornecido" });
  }
  const usuario = usuarios.find(u => u.id === usuarioId);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  res.status(200).json(usuario);
});

router.post('/usuarios', (req: Request, res: Response) => {
  const { nome, perfil } = req.body;
  
  if (!nome || !perfil) {
    return res.status(400).json({ erro: "Nome e perfil são obrigatórios" });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    perfil
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

export default router;