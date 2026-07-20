import { Router } from "express";
import {
  criarReserva,
  listarReservas,
  buscarReservaPorId,
  atualizarReserva,
  deletarReserva,
} from "../controllers/reservaController.js";

const router = Router();

router.post("/", criarReserva);
router.get("/", listarReservas);
router.get("/:id", buscarReservaPorId);
router.put("/:id", atualizarReserva);
router.delete("/:id", deletarReserva);

export default router;