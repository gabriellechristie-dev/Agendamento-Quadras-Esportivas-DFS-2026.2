import { Router } from "express";
import {
  criarReserva,
  listarReservas,
  buscarReservaPorId,
  atualizarReserva,
  deletarReserva,
} from "../controllers/reservaController.js";

import {autenticarUsuario} from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/",autenticarUsuario, criarReserva);
router.get("/",autenticarUsuario, listarReservas);
router.get("/:id",autenticarUsuario, buscarReservaPorId);
router.put("/:id",autenticarUsuario, atualizarReserva);
router.delete("/:id",autenticarUsuario, deletarReserva);

export default router;