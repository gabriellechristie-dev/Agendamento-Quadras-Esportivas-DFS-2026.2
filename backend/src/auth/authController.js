import { cadastrarUsuario } from "./authService.js";

export const registrarUsuario = async (request, response) => {

    try {

        const usuario = await cadastrarUsuario(request.body);

        return response.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario
        });

    } catch (error) {

        console.error(error);

        return response.status(400).json({
            mensagem: error.message
        });

    }
};