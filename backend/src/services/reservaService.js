import { prisma } from "../lib/prisma.js";
import { STATUS_RESERVA } from "../utils/constants.js";
import {
  calcularHorarioFim,
  verificarConflitoHorario,
} from "../utils/reservaUtils.js";

// 1. Criar Reserva
export const criarReserva = async (dados) => {
  const inicio = new Date(dados.dataHora);
  const duracaoMinutos = dados.duracao ? Number(dados.duracao) : 60;
  const fim = calcularHorarioFim(dados.dataHora, duracaoMinutos);
  const quadraId = String(dados.quadraId);

  // Valida sobreposição de horários antes de criar
  await verificarConflitoHorario(quadraId, inicio, fim);

  return await prisma.reserva.create({
    data: {
      data: inicio,
      horarioInicio: inicio,
      horarioFim: fim,
      quadraId: quadraId,
      jogadorId: String(dados.jogadorId),
      status: dados.status || STATUS_RESERVA.ATIVA,
    },
    include: {
      quadra: true,
      jogador: {
        select: {
          id: true,
          nomeCompleto: true,
          email: true,
          telefone: true,
        },
      },
    },
  });
};

// 2. Listar Reservas (Filtra por jogadorId se informado)
export const listarReservas = async (jogadorId = null) => {
  const whereCondition = {};

  if (jogadorId) {
    whereCondition.jogadorId = String(jogadorId);
  }

  return await prisma.reserva.findMany({
    where: whereCondition,
    include: {
      quadra: true,
      jogador: {
        select: {
          id: true,
          nomeCompleto: true,
          email: true,
          telefone: true,
        },
      },
    },
    orderBy: {
      horarioInicio: "asc",
    },
  });
};

// 3. Buscar Reserva por ID
export const buscarReservaPorId = async (id) => {
  return await prisma.reserva.findUnique({
    where: {
      id: String(id),
    },
    include: {
      quadra: true,
      jogador: {
        select: {
          id: true,
          nomeCompleto: true,
          email: true,
          telefone: true,
        },
      },
    },
  });
};

// 4. Atualizar Reserva
export const atualizarReserva = async (id, dados) => {
  const reservaId = String(id);

  const reservaAtual = await prisma.reserva.findUnique({
    where: { id: reservaId },
  });

  if (!reservaAtual) {
    const error = new Error("Reserva não encontrada.");
    error.status = 404;
    throw error;
  }

  const inicio = dados.dataHora
    ? new Date(dados.dataHora)
    : reservaAtual.horarioInicio;
  const duracaoMinutos = dados.duracao ? Number(dados.duracao) : 60;
  const fim = calcularHorarioFim(inicio, duracaoMinutos);
  const quadraId = dados.quadraId
    ? String(dados.quadraId)
    : reservaAtual.quadraId;

  await verificarConflitoHorario(quadraId, inicio, fim, reservaId);

  return await prisma.reserva.update({
    where: { id: reservaId },
    data: {
      ...(dados.dataHora && {
        data: inicio,
        horarioInicio: inicio,
        horarioFim: fim,
      }),
      ...(dados.status && { status: dados.status }),
      ...(dados.quadraId && { quadraId }),
      ...(dados.jogadorId && { jogadorId: String(dados.jogadorId) }),
    },
    include: {
      quadra: true,
      jogador: {
        select: {
          id: true,
          nomeCompleto: true,
          email: true,
          telefone: true,
        },
      },
    },
  });
};

// 5. Deletar Reserva
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