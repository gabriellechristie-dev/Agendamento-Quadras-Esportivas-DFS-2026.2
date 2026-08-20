import api from "./api.js";

export const login = async (email, senha) => {
  const response = await api.post("/auth/login", { email, senha });
  
  return response.data;
};

export const registrarUsuario = async (
  nomeCompleto,
  email,
  telefone,
  senha
) => {
  
  const response = await api.post("/auth/registrar", {
    nomeCompleto,
    email,
    telefone,
    senha,
  });

  return response.data;
};