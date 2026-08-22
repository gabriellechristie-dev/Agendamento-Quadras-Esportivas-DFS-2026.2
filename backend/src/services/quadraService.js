import { prisma } from "../lib/prisma.js";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function listarQuadrasApi() {
  const response = await api.get("/quadras");
  return response.data;
}

export async function buscarQuadraPorIdApi(id) {
  const response = await api.get(`/quadras/${id}`);
  return response.data;
}

export const listarQuadras = async () => {
  return await prisma.quadra.findMany();
};

export const buscarQuadraPorId = async (id) => {
  return await prisma.quadra.findUnique({
    where: { id: String(id) },
  });
};

export const criarQuadra = async (dados) => {
  return await prisma.quadra.create({
    data: {
      nome: dados.nome,
      modalidade: dados.modalidade,
      localizacao: dados.localizacao,
      status: dados.status || "DISPONIVEL",
    },
  });
};

export const atualizarQuadra = async (id, dados) => {
  return await prisma.quadra.update({
    where: { id: String(id) },
    data: {
      nome: dados.nome,
      modalidade: dados.modalidade,
      localizacao: dados.localizacao,
      ...(dados.status && { status: dados.status }),
    },
  });
};

export const deletarQuadra = async (id) => {
  return await prisma.quadra.delete({
    where: { id: String(id) },
  });
};

const quadraService = {
  listarQuadras,
  buscarQuadraPorId,
  criarQuadra,
  atualizarQuadra,
  deletarQuadra,
};

export default quadraService;
