import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const cadastrarUsuario = async ({
  nomeCompleto,
  email,
  telefone,
  senha,
}) => {
  const usuarioExistente = await prisma.jogador.findUnique({
    where: {
      email,
    },
  });

  if (usuarioExistente) {
    throw new Error("Erro: Já existe um usuário cadastrado com este email!");
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.jogador.create({
    data: {
      nomeCompleto,
      email,
      telefone,
      senha: senhaCriptografada,
    },
  });

  return {
    id: novoUsuario.id,
    nomeCompleto: novoUsuario.nomeCompleto,
    email: novoUsuario.email,
    telefone: novoUsuario.telefone,
  };
};

export const loginUsuario = async ({ email, senha }) => {
  const jogador = await prisma.jogador.findUnique({
    where: {
      email,
    },
  });

  const administrador = await prisma.administrador.findUnique({
    where: {
      email,
    },
  });

  const usuario = jogador || administrador;

  if (!usuario) {
    throw new Error("Email ou senha inválidos!");
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    throw new Error("Email ou senha inválidos!");
  }

  const tipo = jogador ? "JOGADOR" : "ADMIN";

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET não está configurado.");
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      tipo,
    },
    jwtSecret,
    {
      expiresIn: "1h",
    },
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      tipo,
    },
  };
};
