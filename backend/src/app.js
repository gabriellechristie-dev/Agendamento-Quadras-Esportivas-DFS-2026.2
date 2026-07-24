import express from "express";

import quadraRoutes from "./routes/quadraRoutes.js";
import jogadorRoutes from './routes/jogadorRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import authRoutes from "./auth/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/quadras", quadraRoutes);
app.use('/jogadores', jogadorRoutes);
app.use('/reservas',reservaRoutes);
app.use("/auth", authRoutes);

export default app;
