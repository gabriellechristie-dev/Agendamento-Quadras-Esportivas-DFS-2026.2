import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

function getAuthHeader() {
  const token = localStorage.getItem("arenaplay:token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function criarReservaApi(dadosReserva) {
  try {
    const response = await api.post("/agendamentos", dadosReserva, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { mensagem: "Erro ao criar reserva." };
  }
}

export async function listarMinhasReservasApi() {
  try {
    const response = await api.get("/agendamentos", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { mensagem: "Erro ao buscar reservas." };
  }
}
