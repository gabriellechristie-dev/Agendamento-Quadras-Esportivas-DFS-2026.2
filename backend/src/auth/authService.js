import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const cadastrarUsuario = async ({
    nomeCompleto,
    email,
    telefone,
    senha
}) => {

    if (!nomeCompleto || !email || !telefone || !senha) {
        throw new Error(
            "Todos os campos (nome, email, telefone e senha) são obrigatórios!"
        );
    }

    const usuarioExistente = await prisma.jogador.findUnique({
        where: {
            email
        }
    });

    if (usuarioExistente) {
        throw new Error(
            "Erro: Já existe um usuário cadastrado com este email!"
        );
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.jogador.create({
        data: {
            nomeCompleto,
            email,
            telefone,
            senha: senhaCriptografada
        }
    });

    return {
        id: novoUsuario.id,
        nomeCompleto: novoUsuario.nomeCompleto,
        email: novoUsuario.email,
        telefone: novoUsuario.telefone
    };
};