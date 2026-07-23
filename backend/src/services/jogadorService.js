import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const cadastrarJogador = async (dadosJogador) => {
  return await prisma.jogador.create({
    data: dadosJogador
  });
};

export const listarJogadores = async () => {
  return await prisma.jogador.findMany();
};

export const atualizarJogador = async (id, dadosAtualizados) => {
  return await prisma.jogador.update({
    where: { id: String(id) },
    data: dadosAtualizados
  });
};

export const deletarJogador = async (id) => {
  return await prisma.jogador.delete({
    where: { id: String(id) }
  });
};

const jogadorService = {
  cadastrarJogador,
  listarJogadores,
  atualizarJogador,
  deletarJogador
};

export default jogadorService;