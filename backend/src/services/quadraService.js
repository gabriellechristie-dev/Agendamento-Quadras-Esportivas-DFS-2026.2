import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export const listarQuadras = async () => {
  return await prisma.quadra.findMany();
};

export const buscarQuadraPorId = async (id) => {
  return await prisma.quadra.findUnique({
    where: { id: String(id) },
  });
};

export const criarQuadra = async (dados) => {
  return await prisma.quadra.create({
    data: {
      nome: dados.nome,
      modalidade: dados.modalidade,
      localizacao: dados.localizacao,
      status: dados.status || "DISPONIVEL",
    },
  });
};

export const atualizarQuadra = async (id, dados) => {
  return await prisma.quadra.update({
    where: { id: String(id) },
    data: {
      nome: dados.nome,
      modalidade: dados.modalidade,
      localizacao: dados.localizacao,
      ...(dados.status && { status: dados.status }),
    },
  });
};

export const deletarQuadra = async (id) => {
  return await prisma.quadra.delete({
    where: { id: String(id) },
  });
};

const quadraService = {
  listarQuadras,
  buscarQuadraPorId,
  criarQuadra,
  atualizarQuadra,
  deletarQuadra,
};

export default quadraService;