const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const listarQuadras = async () => {
  const quadras = await prisma.quadra.findMany();
  return quadras;
};

const buscarQuadraPorId = async (id) => {
  const quadra = await prisma.quadra.findUnique({
    where: {
      id: Number(id),
    },
  });
  return quadra;
};

const criarQuadra = async (dados) => {
  const novaQuadra = await prisma.quadra.create({
    data: {
      nome: dados.nome,
      modalidade: dados.modalidade,
      localizacao: dados.localizacao,
    },
  });
  return novaQuadra;
};

const atualizarQuadra = async (id, dados) => {
  const quadraAtualizada = await prisma.quadra.update({
    where: {
      id: Number(id),
    },
    data: {
      nome: dados.nome,
      modalidade: dados.modalidade,
      localizacao: dados.localizacao,
    },
  });
  return quadraAtualizada;
};

const deletarQuadra = async (id) => {
  const quadraDeletada = await prisma.quadra.delete({
    where: {
      id: Number(id),
    },
  });
  return quadraDeletada;
};

module.exports = {
  listarQuadras,
  buscarQuadraPorId,
  criarQuadra,
  atualizarQuadra,
  deletarQuadra,
};
