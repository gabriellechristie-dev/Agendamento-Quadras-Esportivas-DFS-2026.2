import { cadastrarUsuario, loginUsuario } from "./authService.js";

export const registrarUsuario = async (request, response) => {
  try {
    const usuario = await cadastrarUsuario(request.body);

    return response.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario,
    });
  } catch (error) {
    console.error(error);

    return response.status(400).json({
      mensagem: error.message,
    });
  }
};

export const login = async (request, response) => {
  try {
    console.log("BODY RECEBIDO NO LOGIN:", request.body); // Adicione esta linha

    const resultado = await loginUsuario(request.body);

    return response.status(200).json({
      mensagem: "Login realizado com sucesso!",
      ...resultado,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      mensagem: error.message,
    });
  }
};
