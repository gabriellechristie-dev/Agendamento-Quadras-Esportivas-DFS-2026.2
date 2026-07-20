import express from "express";

import quadraRoutes from "./routes/quadraRoutes.js";
import jogadorRoutes from './routes/jogadorRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';

const app = express();

app.use(express.json());

app.use("/quadra", quadraRoutes);
app.use('/jogadores', jogadorRoutes);
app.use('/reservas',reservaRoutes);

export default app;
