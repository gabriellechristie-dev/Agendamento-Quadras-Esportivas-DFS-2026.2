import express from "express";

import quadraRoutes from "./routes/quadraRoutes.js";

const app = express();

app.use(express.json());

app.use("/quadra", quadraRoutes);

export default app;
