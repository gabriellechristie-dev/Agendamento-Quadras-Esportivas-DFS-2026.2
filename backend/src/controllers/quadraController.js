const quadraService = require("../services/quadraService");

async function criarQuadra(request, response) {
  try {
    const novaQuadra = await quadraService.criarQuadra(request.body);
    return response.status(201).json(novaQuadra);
  } catch (error) {
    console.error("Erro ao criar quadra:", error);
    return response
      .status(500)
      .json({ erro: "Erro interno ao cadastrar a quadra." });
  }
}

async function listarQuadras(request, response) {
  try {
    const quadras = await quadraService.listarQuadras();
    return response.status(200).json(quadras);
  } catch (error) {
    console.error("Erro ao listar quadras:", error);
    return response
      .status(500)
      .json({ erro: "Erro interno ao buscar as quadras." });
  }
}

async function buscarQuadraPorId(request, response) {
  try {
    const { id } = request.params;
    const quadra = await quadraService.buscarQuadraPorId(id);

    if (!quadra) {
      return response.status(404).json({ erro: "Quadra não encontrada." });
    }

    return response.status(200).json(quadra);
  } catch (error) {
    console.error("Erro ao buscar quadra:", error);
    return response
      .status(500)
      .json({ erro: "Erro interno ao buscar a quadra." });
  }
}

async function atualizarQuadra(request, response) {
  try {
    const { id } = request.params;
    const quadraAtualizada = await quadraService.atualizarQuadra(
      id,
      request.body,
    );
    return response.status(200).json(quadraAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar quadra:", error);
    return response
      .status(500)
      .json({ erro: "Erro ao atualizar os dados da quadra." });
  }
}

async function deletarQuadra(request, response) {
  try {
    const { id } = request.params;
    await quadraService.deletarQuadra(id);
    return response.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar quadra:", error);
    return response
      .status(500)
      .json({ erro: "Erro ao remover a quadra do sistema." });
  }
}

module.exports = {
  criarQuadra,
  listarQuadras,
  buscarQuadraPorId,
  atualizarQuadra,
  deletarQuadra,
};
