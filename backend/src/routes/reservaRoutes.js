import { Router } from "express";
import {
  criarReserva,
  listarReservas,
  buscarReservaPorId,
  atualizarReserva,
  deletarReserva,
} from "../controllers/reservaController.js";

import { autenticarUsuario } from "../middlewares/authMiddleware.js";
import { validarSchema } from "../middlewares/validateMiddleware.js";
import { criarReservaSchema } from "../schemas/reservaSchema.js";

const router = Router();

router.post(
  "/",
  autenticarUsuario,
  validarSchema(criarReservaSchema),
  criarReserva,
);
router.get("/", autenticarUsuario, listarReservas);
router.get("/:id", autenticarUsuario, buscarReservaPorId);
router.put(
  "/:id",
  autenticarUsuario,
  validarSchema(criarReservaSchema),
  atualizarReserva,
);
router.delete("/:id", autenticarUsuario, deletarReserva);

export default router;
