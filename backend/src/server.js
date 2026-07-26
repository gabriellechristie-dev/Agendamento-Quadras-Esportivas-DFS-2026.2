import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`🚨 Erro não tratado: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
