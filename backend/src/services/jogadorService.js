import { prisma } from "../lib/prisma.js";

export const cadastrarJogador = async (dadosJogador) => {
  return await prisma.jogador.create({
    data: {
      nomeCompleto: dadosJogador.nomeCompleto,
      email: dadosJogador.email,
      telefone: dadosJogador.telefone,
      senha: dadosJogador.senha,
    },
  });
};

export const listarJogadores = async () => {
  return await prisma.jogador.findMany();
};

export const atualizarJogador = async (id, dadosAtualizados) => {
  return await prisma.jogador.update({
    where: { id: String(id) },
    data: dadosAtualizados,
  });
};

export const deletarJogador = async (id) => {
  return await prisma.jogador.delete({
    where: { id: String(id) },
  });
};

const jogadorService = {
  cadastrarJogador,
  listarJogadores,
  atualizarJogador,
  deletarJogador,
};

export default jogadorService;
