import * as jogadorService from "../services/jogadorService.js";
import bcrypt from "bcrypt";

export const cadastrarJogador = async (request, response) => {
  try {
    const { nomeCompleto, email, telefone, senha } = request.body;

    if (
      !nomeCompleto?.trim() ||
      !email?.trim() ||
      !telefone?.trim() ||
      !senha?.trim()
    ) {
      return response.status(400).json({
        mensagem:
          "Erro: Todos os campos (nome, email, telefone e senha) são obrigatórios!",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoJogador = await jogadorService.cadastrarJogador({
      nomeCompleto,
      email,
      telefone,
      senha: senhaHash,
    });

    console.log(`Jogador cadastrado com sucesso: ${novoJogador.nomeCompleto}`);
    return response.status(201).json({
      mensagem: "Jogador cadastrado com sucesso!",
      jogador: novoJogador,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return response
        .status(400)
        .json({ mensagem: "Erro: Email já cadastrado!" });
    }
    return response
      .status(500)
      .json({ mensagem: "Erro ao cadastrar jogador." });
  }
};

export const listarJogadores = async (request, response) => {
  try {
    const jogadorListado = await jogadorService.listarJogadores();

    console.log(`Total de jogadores encontrados: ${jogadorListado.length}`);
    return response.status(200).json(jogadorListado);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro ao listar jogadores." });
  }
};

export const atualizarJogador = async (request, response) => {
  try {
    const { id } = request.params;
    const { nomeCompleto, email, telefone } = request.body;

    if (!nomeCompleto?.trim() || !email?.trim() || !telefone?.trim()) {
      return response.status(400).json({
        mensagem:
          "Erro: Todos os campos (nome, email e telefone) são obrigatórios!",
      });
    }

    const jogadorAtualizado = await jogadorService.atualizarJogador(id, {
      nomeCompleto,
      email,
      telefone,
    });

    console.log(
      `Jogador updated com sucesso: ${jogadorAtualizado.nomeCompleto}`,
    );
    return response.status(200).json({
      mensagem: "Jogador atualizado com sucesso!",
      jogador: jogadorAtualizado,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return response
        .status(404)
        .json({ mensagem: "Erro: Jogador não encontrado!" });
    }
    return response
      .status(500)
      .json({ mensagem: "Erro ao atualizar jogador." });
  }
};

export const deletarJogador = async (request, response) => {
  try {
    const { id } = request.params;

    await jogadorService.deletarJogador(id);

    console.log(`Jogador de id ${id} deletado com sucesso!`);
    return response
      .status(200)
      .json({ mensagem: "Jogador deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return response
        .status(404)
        .json({ mensagem: "Erro: Jogador não encontrado!" });
    }
    return response.status(500).json({ mensagem: "Erro ao deletar jogador." });
  }
};
