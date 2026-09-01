import api from './api';

export const reservaService = {
  criarReserva: async (dados) => (await api.post('/reservas', dados)).data,
  listarMinhasReservas: async () => (await api.get('/reservas')).data,
  buscarPorId: async (id) => (await api.get('/reservas/' + id)).data,
  cancelarReserva: async (id) => (await api.delete('/reservas/' + id)).data
};

export default reservaService;