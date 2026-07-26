import * as reservaService from "../services/reservaService.js";

export const criarReserva = async (request, response) => {
  const { dataHora, data, duracao, quadraId, jogadorId } = request.body;
  const dataFinal = dataHora || data;

  const jogadorReservaId =
    request.usuario?.tipo === "ADMIN"
      ? jogadorId
      : request.usuario?.id || jogadorId;

  const novaReserva = await reservaService.criarReserva({
    dataHora: dataFinal,
    duracao,
    quadraId,
    jogadorId: jogadorReservaId,
  });

  return response.status(201).json({
    mensagem: "Reserva criada com sucesso!",
    reserva: novaReserva,
  });
};

export const listarReservas = async (request, response) => {
  const reservas = await reservaService.listarReservas();
  return response.status(200).json(reservas);
};

export const buscarReservaPorId = async (request, response) => {
  const { id } = request.params;
  const reserva = await reservaService.buscarReservaPorId(id);

  if (!reserva) {
    return response.status(404).json({
      mensagem: "Reserva não encontrada.",
    });
  }

  const usuarioEhAdmin = request.usuario?.tipo === "ADMIN";
  const reservaPertenceAoUsuario = reserva.jogadorId === request.usuario?.id;

  if (!usuarioEhAdmin && !reservaPertenceAoUsuario) {
    return response.status(403).json({
      mensagem: "Você não possui permissão para acessar esta reserva!",
    });
  }

  return response.status(200).json(reserva);
};

export const atualizarReserva = async (request, response) => {
  const { id } = request.params;
  const { dataHora, data, duracao, quadraId, jogadorId } = request.body;

  const reservaExistente = await reservaService.buscarReservaPorId(id);

  if (!reservaExistente) {
    return response.status(404).json({
      mensagem: "Reserva não encontrada.",
    });
  }

  const usuarioEhAdmin = request.usuario?.tipo === "ADMIN";
  const reservaPertenceAoUsuario =
    reservaExistente.jogadorId === request.usuario?.id;

  if (!usuarioEhAdmin && !reservaPertenceAoUsuario) {
    return response.status(403).json({
      mensagem: "Você não possui permissão para atualizar esta reserva!",
    });
  }

  const dadosAtualizados = {
    dataHora: dataHora || data,
    duracao,
    quadraId,
  };

  if (usuarioEhAdmin && jogadorId) {
    dadosAtualizados.jogadorId = jogadorId;
  }

  const reservaAtualizada = await reservaService.atualizarReserva(
    id,
    dadosAtualizados,
  );

  return response.status(200).json({
    mensagem: "Reserva atualizada com sucesso!",
    reserva: reservaAtualizada,
  });
};

export const deletarReserva = async (request, response) => {
  const { id } = request.params;

  const reservaExistente = await reservaService.buscarReservaPorId(id);

  if (!reservaExistente) {
    return response.status(404).json({
      mensagem: "Reserva não encontrada.",
    });
  }

  const usuarioEhAdmin = request.usuario?.tipo === "ADMIN";
  const reservaPertenceAoUsuario =
    reservaExistente.jogadorId === request.usuario?.id;

  if (!usuarioEhAdmin && !reservaPertenceAoUsuario) {
    return response.status(403).json({
      mensagem: "Você não possui permissão para excluir esta reserva!",
    });
  }

  await reservaService.deletarReserva(id);

  return response.status(200).json({
    mensagem: "Reserva deletada com sucesso!",
  });
};
