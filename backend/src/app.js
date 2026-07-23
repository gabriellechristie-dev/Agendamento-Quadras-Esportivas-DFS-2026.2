import express from "express";

import jogadorRoutes from "./routes/jogadorRoutes.js";
import quadraRoutes from "./routes/quadraRoutes.js";
import authRoutes from "./auth/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/jogadores", jogadorRoutes);
app.use("/quadras", quadraRoutes);
app.use("/auth", authRoutes);

export default app;