import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Antes de cada requisição, adiciona o JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(
    "arenaplay:token"
  );

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

// Trata respostas com token inválido ou expirado
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      // Remove a sessão inválida
      localStorage.removeItem(
        "arenaplay:token"
      );

      localStorage.removeItem(
        "arenaplay:user"
      );

      // Retorna para o login
      window.location.href = "/login";
    }

    // Mantém o erro original disponível
    return Promise.reject(error);
  }
);

export default api;