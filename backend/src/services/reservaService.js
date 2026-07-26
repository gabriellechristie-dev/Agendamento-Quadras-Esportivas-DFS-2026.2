import { prisma } from "../lib/prisma.js";
import { STATUS_RESERVA } from "../utils/constants.js";
import {
  calcularHorarioFim,
  verificarConflitoHorario,
} from "../utils/reservaUtils.js";

export const criarReserva = async (dados) => {
  const inicio = new Date(dados.dataHora);
  const fim = calcularHorarioFim(dados.dataHora, dados.duracao);
  const quadraId = String(dados.quadraId);

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
  });
};

export const listarReservas = async () => {
  return await prisma.reserva.findMany({
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
