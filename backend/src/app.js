import express from "express";

import jogadorRoutes from "./routes/jogadorRoutes.js";
import authRoutes from "./auth/authRoutes.js";

const app = express();

app.use(express.json());

app.get("/teste", (request, response) => {
    return response.status(200).json({
        mensagem: "Servidor correto funcionando!"
    });
});

app.use("/jogadores", jogadorRoutes);
app.use("/auth", authRoutes);

export default app;