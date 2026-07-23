import { Router } from "express";

import { autenticarUsuario } from "../middlewares/authMiddleware.js";
import { permitirTipos } from "../middlewares/roleMiddleware.js";

const router = Router();

router.post(
  "/",
  autenticarUsuario,
  permitirTipos("ADMIN"),
  (request, response) => {
    return response.status(200).json({
      mensagem: "Administrador autorizado a criar quadras!",
      usuario: request.usuario
    });
  }
);

export default router;