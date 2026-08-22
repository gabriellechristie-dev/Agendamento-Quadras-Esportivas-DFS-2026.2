import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function listarQuadrasApi() {
  try {
    const response = await api.get("/quadras");
    return response.data;
  } catch (error) {
    throw error.response?.data || { mensagem: "Erro ao buscar quadras." };
  }
}

export async function buscarQuadraPorIdApi(id) {
  try {
    const response = await api.get(`/quadras/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { mensagem: "Erro ao buscar detalhes da quadra." }
    );
  }
}
