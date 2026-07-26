import { prisma } from "../lib/prisma.js";
import { STATUS_RESERVA } from "./constants.js";

export const calcularHorarioFim = (dataHoraInicio, duracaoMinutos = 60) => {
  const inicio = new Date(dataHoraInicio);
  const duracao = Number(duracaoMinutos);
  return new Date(inicio.getTime() + duracao * 60000);
};

export const verificarConflitoHorario = async (
  quadraId,
  inicio,
  fim,
  reservaIdIgnorar = null,
) => {
  const conflito = await prisma.reserva.findFirst({
    where: {
      quadraId: String(quadraId),
      status: STATUS_RESERVA.ATIVA,
      ...(reservaIdIgnorar && { id: { not: String(reservaIdIgnorar) } }),
      AND: [{ horarioInicio: { lt: fim } }, { horarioFim: { gt: inicio } }],
    },
  });

  if (conflito) {
    const error = new Error("Horário indisponível para esta quadra.");
    error.status = 400;
    throw error;
  }
};
