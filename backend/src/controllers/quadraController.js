import * as quadraService from "../services/quadraService.js";

// CRIAR QUADRA
export const criarQuadra = async (req, res) => {
  try {
    const { nome, modalidade, localizacao, status } = req.body;

    if (!nome?.trim() || !modalidade?.trim() || !localizacao?.trim()) {
      return res.status(400).json({
        mensagem: "Erro: Todos os campos (nome, modalidade e localizacao) são obrigatórios!",
      });
    }

    const novaQuadra = await quadraService.criarQuadra({ nome, modalidade, localizacao, status });
    return res.status(201).json({
      mensagem: "Quadra criada com sucesso!",
      quadra: novaQuadra,
    });
  } catch (error) {
    console.error("Erro ao criar quadra:", error);
    return res.status(500).json({ mensagem: "Erro ao criar quadra." });
  }
};

// LISTAR QUADRAS
export const listarQuadras = async (req, res) => {
  try {
    const quadras = await quadraService.listarQuadras();
    return res.status(200).json(quadras);
  } catch (error) {
    console.error("Erro ao listar quadras:", error);
    return res.status(500).json({ mensagem: "Erro ao listar quadras." });
  }
};

// BUSCAR QUADRA POR ID
export const buscarQuadraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const quadra = await quadraService.buscarQuadraPorId(id);

    if (!quadra) {
      return res.status(404).json({ mensagem: "Quadra não encontrada." });
    }

    return res.status(200).json(quadra);
  } catch (error) {
    console.error("Erro ao buscar quadra:", error);
    return res.status(500).json({ mensagem: "Erro ao buscar quadra." });
  }
};

// ATUALIZAR QUADRA
export const atualizarQuadra = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, modalidade, localizacao, status } = req.body;

    const quadraAtualizada = await quadraService.atualizarQuadra(id, {
      nome,
      modalidade,
      localizacao,
      status,
    });

    return res.status(200).json({
      mensagem: "Quadra atualizada com sucesso!",
      quadra: quadraAtualizada,
    });
  } catch (error) {
    console.error("Erro ao atualizar quadra:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ mensagem: "Quadra não encontrada." });
    }
    return res.status(500).json({ mensagem: "Erro ao atualizar quadra." });
  }
};

// DELETAR QUADRA
export const deletarQuadra = async (req, res) => {
  try {
    const { id } = req.params;
    await quadraService.deletarQuadra(id);
    return res.status(200).json({ mensagem: "Quadra deletada com sucesso!" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ mensagem: "Quadra não encontrada." });
    }
    if (error.code === "P2003") {
      return res.status(400).json({
        mensagem: "Erro: Não é possível deletar esta quadra pois há reservas vinculadas a ela.",
      });
    }
    console.error("Erro ao deletar quadra:", error);
    return res.status(500).json({ mensagem: "Erro ao deletar quadra." });
  }
};