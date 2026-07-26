import express from "express";
import cors from "cors";

import quadraRoutes from "./routes/quadraRoutes.js";
import jogadorRoutes from "./routes/jogadorRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import authRoutes from "./auth/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({
    mensagem: "API de Agendamento de Quadras está online! 🚀",
    versao: "1.0.0",
  });
});

app.use("/quadras", quadraRoutes);
app.use("/jogadores", jogadorRoutes);
app.use("/reservas", reservaRoutes);
app.use("/auth", authRoutes);

app.use((request, response) => {
  response.status(404).json({
    mensagem: "Rota não encontrada. Verifique a URL e tente novamente.",
  });
});

app.use((error, request, response, next) => {
  console.error("Erro interno:", error);
  response.status(500).json({
    mensagem: "Ocorreu um erro interno no servidor.",
  });
});

export default app;
