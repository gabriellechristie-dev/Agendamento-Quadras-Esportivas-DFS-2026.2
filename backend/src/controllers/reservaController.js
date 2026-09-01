import * as reservaService from "../services/reservaService.js";

// Criar reserva
export const criarReserva = async (request, response) => {
  try {
    const { dataHora, data, duracao, quadraId, jogadorId } = request.body;
    const dataFinal = dataHora || data;

    const jogadorReservaId =
      request.usuario?.tipo === "ADMIN"
        ? jogadorId
        : request.usuario?.id || jogadorId;

    if (!jogadorReservaId) {
      return response.status(401).json({
        mensagem: "Usuário não identificado para realizar a reserva.",
      });
    }

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
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    const status = error.status || 400;
    return response.status(status).json({
      mensagem: error.message || "Erro ao processar criação da reserva.",
    });
  }
};

// Listar reservas (retorna apenas do jogador logado se não for admin)
export const listarReservas = async (request, response) => {
  try {
    const usuarioEhAdmin = request.usuario?.tipo === "ADMIN";
    const jogadorId = usuarioEhAdmin ? null : request.usuario?.id;

    const reservas = await reservaService.listarReservas(jogadorId);
    return response.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    return response.status(500).json({
      mensagem: error.message || "Erro ao buscar reservas.",
    });
  }
};

// Buscar reserva por ID
export const buscarReservaPorId = async (request, response) => {
  try {
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
  } catch (error) {
    console.error("Erro ao buscar reserva por ID:", error);
    return response.status(500).json({
      mensagem: error.message || "Erro ao buscar reserva.",
    });
  }
};

// Atualizar reserva
export const atualizarReserva = async (request, response) => {
  try {
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
      dadosAtualizados
    );

    return response.status(200).json({
      mensagem: "Reserva atualizada com sucesso!",
      reserva: reservaAtualizada,
    });
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    const status = error.status || 400;
    return response.status(status).json({
      mensagem: error.message || "Erro ao atualizar reserva.",
    });
  }
};

// Deletar reserva
export const deletarReserva = async (request, response) => {
  try {
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
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    return response.status(500).json({
      mensagem: error.message || "Erro ao deletar reserva.",
    });
  }
};