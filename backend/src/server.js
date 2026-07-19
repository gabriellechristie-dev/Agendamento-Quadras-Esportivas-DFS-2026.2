const express = require("express");
const app = express();

app.use(express.json());

const quadraRoutes = require("./routes/quadraRoutes");
app.use("/quadras", quadraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
