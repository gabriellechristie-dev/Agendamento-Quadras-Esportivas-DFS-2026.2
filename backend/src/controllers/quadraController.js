import * as quadraService from "../services/quadraService.js";

export const criarQuadra = async (request, response) => {
  try {
    const { nome, modalidade, localizacao, status } = request.body;

    const novaQuadra = await quadraService.criarQuadra({
      nome,
      modalidade,
      localizacao,
      status,
    });

    return response.status(201).json({
      mensagem: "Quadra criada com sucesso!",
      quadra: novaQuadra,
    });
  } catch (error) {
    console.error("Erro ao criar quadra:", error);
    return response.status(500).json({ mensagem: "Erro ao criar quadra." });
  }
};

export const listarQuadras = async (request, response) => {
  try {
    const quadras = await quadraService.listarQuadras();
    return response.status(200).json(quadras);
  } catch (error) {
    console.error("Erro ao listar quadras:", error);
    return response.status(500).json({ mensagem: "Erro ao listar quadras." });
  }
};

export const buscarQuadraPorId = async (request, response) => {
  try {
    const { id } = request.params;
    const quadra = await quadraService.buscarQuadraPorId(id);

    if (!quadra) {
      return response.status(404).json({ mensagem: "Quadra não encontrada." });
    }

    return response.status(200).json(quadra);
  } catch (error) {
    console.error("Erro ao buscar quadra:", error);
    return response.status(500).json({ mensagem: "Erro ao buscar quadra." });
  }
};

export const atualizarQuadra = async (request, response) => {
  try {
    const { id } = request.params;
    const { nome, modalidade, localizacao, status } = request.body;

    const quadraAtualizada = await quadraService.atualizarQuadra(id, {
      nome,
      modalidade,
      localizacao,
      status,
    });

    return response.status(200).json({
      mensagem: "Quadra atualizada com sucesso!",
      quadra: quadraAtualizada,
    });
  } catch (error) {
    console.error("Erro ao atualizar quadra:", error);
    if (error.code === "P2025") {
      return response.status(404).json({ mensagem: "Quadra não encontrada." });
    }
    return response.status(500).json({ mensagem: "Erro ao atualizar quadra." });
  }
};

export const deletarQuadra = async (request, response) => {
  try {
    const { id } = request.params;
    await quadraService.deletarQuadra(id);
    return response
      .status(200)
      .json({ mensagem: "Quadra deletada com sucesso!" });
  } catch (error) {
    if (error.code === "P2025") {
      return response.status(404).json({ mensagem: "Quadra não encontrada." });
    }
    if (error.code === "P2003") {
      return response.status(400).json({
        mensagem:
          "Erro: Não é possível deletar esta quadra pois há reservas vinculadas a ela.",
      });
    }
    console.error("Erro ao deletar quadra:", error);
    return response.status(500).json({ mensagem: "Erro ao deletar quadra." });
  }
};
