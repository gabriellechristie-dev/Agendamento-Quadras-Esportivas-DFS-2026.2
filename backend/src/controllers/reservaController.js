import * as reservaService from "../services/reservaService.js";

export const criarReserva = async (req, res) => {
  try {
    const {
      dataHora,
      data,
      duracao,
      quadraId,
      jogadorId
    } = req.body;

    const dataFinal = dataHora || data;

    const jogadorReservaId =
      req.usuario.tipo === "ADMIN"
        ? jogadorId
        : req.usuario.id;

    if (!dataFinal || !duracao || !quadraId || !jogadorReservaId) {
      return res.status(400).json({
        mensagem:
          "Erro: data, duração, quadra e jogador são obrigatórios!"
      });
    }

    const novaReserva = await reservaService.criarReserva({
      dataHora: dataFinal,
      duracao,
      quadraId,
      jogadorId: jogadorReservaId
    });

    return res.status(201).json({
      mensagem: "Reserva criada com sucesso!",
      reserva: novaReserva
    });

  } catch (error) {
    console.error("Erro ao criar reserva:", error);

    return res.status(500).json({
      mensagem: "Erro ao criar reserva.",
      detalhe: error.message
    });
  }
};

export const listarReservas = async (req, res) => {
  try {
    const reservas = await reservaService.listarReservas();
    return res.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    return res.status(500).json({ mensagem: "Erro ao listar reservas." });
  }
};

export const buscarReservaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await reservaService.buscarReservaPorId(id);

    if (!reserva) {
      return res.status(404).json({
        mensagem: "Reserva não encontrada."
      });
    }

    const usuarioEhAdmin = req.usuario.tipo === "ADMIN";

    const reservaPertenceAoUsuario =
      reserva.jogadorId === req.usuario.id;

    if (!usuarioEhAdmin && !reservaPertenceAoUsuario) {
      return res.status(403).json({
        mensagem: "Você não possui permissão para acessar esta reserva!"
      });
    }

    return res.status(200).json(reserva);

  } catch (error) {
    console.error("Erro ao buscar reserva:", error);

    return res.status(500).json({
      mensagem: "Erro ao buscar reserva."
    });
  }
};

export const atualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      dataHora,
      data,
      duracao,
      quadraId,
      jogadorId
    } = req.body;

    const reservaExistente =
      await reservaService.buscarReservaPorId(id);

    if (!reservaExistente) {
      return res.status(404).json({
        mensagem: "Reserva não encontrada."
      });
    }

    const usuarioEhAdmin =
      req.usuario.tipo === "ADMIN";

    const reservaPertenceAoUsuario =
      reservaExistente.jogadorId === req.usuario.id;

    if (!usuarioEhAdmin && !reservaPertenceAoUsuario) {
      return res.status(403).json({
        mensagem:
          "Você não possui permissão para atualizar esta reserva!"
      });
    }

    const dadosAtualizados = {
      dataHora: dataHora || data,
      duracao,
      quadraId
    };

    if (usuarioEhAdmin && jogadorId) {
      dadosAtualizados.jogadorId = jogadorId;
    }

    const reservaAtualizada =
      await reservaService.atualizarReserva(
        id,
        dadosAtualizados
      );

    return res.status(200).json({
      mensagem: "Reserva atualizada com sucesso!",
      reserva: reservaAtualizada
    });

  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        mensagem: "Reserva não encontrada."
      });
    }

    return res.status(500).json({
      mensagem: "Erro ao atualizar reserva.",
      detalhe: error.message
    });
  }
};

export const deletarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const reservaExistente =
      await reservaService.buscarReservaPorId(id);

    if (!reservaExistente) {
      return res.status(404).json({
        mensagem: "Reserva não encontrada."
      });
    }

    const usuarioEhAdmin =
      req.usuario.tipo === "ADMIN";

    const reservaPertenceAoUsuario =
      reservaExistente.jogadorId === req.usuario.id;

    if (!usuarioEhAdmin && !reservaPertenceAoUsuario) {
      return res.status(403).json({
        mensagem:
          "Você não possui permissão para excluir esta reserva!"
      });
    }

    await reservaService.deletarReserva(id);

    return res.status(200).json({
      mensagem: "Reserva deletada com sucesso!"
    });

  } catch (error) {
    console.error("Erro ao deletar reserva:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        mensagem: "Reserva não encontrada."
      });
    }

    return res.status(500).json({
      mensagem: "Erro ao deletar reserva.",
      detalhe: error.message
    });
  }
};