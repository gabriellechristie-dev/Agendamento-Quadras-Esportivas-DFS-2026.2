import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const criarReserva = async (dados) => {
  const inicio = new Date(dados.dataHora);
  const duracaoMinutos = Number(dados.duracao || 60);
  const fim = new Date(inicio.getTime() + duracaoMinutos * 60000);
  const quadraId = String(dados.quadraId);

 
  const conflito = await prisma.reserva.findFirst({
    where: {
      quadraId: quadraId,
      status: "ATIVA",
      AND: [
        { horarioInicio: { lt: fim } },    
        { horarioFim: { gt: inicio } },    
      ],
    },
  });

  if (conflito) {
    throw new Error("Horário indisponível para esta quadra.");
  }

  
  return await prisma.reserva.create({
    data: {
      data: inicio,
      horarioInicio: inicio,
      horarioFim: fim,
      quadraId: quadraId,
      jogadorId: String(dados.jogadorId),
      status: dados.status || "ATIVA",
    },
  });
};
export const listarReservas = async () => {
  return await prisma.reserva.findMany({
    include: {
      quadra: true,
      jogador: true,
    },
  });
};

export const buscarReservaPorId = async (id) => {
  return await prisma.reserva.findUnique({
    where: { id: String(id) },
    include: {
      quadra: true,
      jogador: true,
    },
  });
};

export const atualizarReserva = async (id, dados) => {
  const inicio = dados.dataHora ? new Date(dados.dataHora) : undefined;
  const duracaoMinutos = dados.duracao ? Number(dados.duracao) : 60;

  let fim = undefined;
  if (inicio) {
    fim = new Date(inicio.getTime() + duracaoMinutos * 60000);
  }

  return await prisma.reserva.update({
    where: { id: String(id) },
    data: {
      ...(inicio && { data: inicio, horarioInicio: inicio, horarioFim: fim }),
      ...(dados.status && { status: dados.status }),
      ...(dados.quadraId && { quadraId: String(dados.quadraId) }),
      ...(dados.jogadorId && { jogadorId: String(dados.jogadorId) }),
    },
  });
};

export const deletarReserva = async (id) => {
  return await prisma.reserva.delete({
    where: { id: String(id) },
  });
};

const reservaService = {
  criarReserva,
  listarReservas,
  buscarReservaPorId,
  atualizarReserva,
  deletarReserva,
};

export default reservaService;