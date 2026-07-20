import { Router } from "express";
import {
  criarQuadra,
  listarQuadras,
  buscarQuadraPorId,
  atualizarQuadra,
  deletarQuadra,
} from "../controllers/quadraController.js";

const router = Router();

router.post("/", criarQuadra);
router.get("/", listarQuadras);
router.get("/:id", buscarQuadraPorId);
router.put("/:id", atualizarQuadra);
router.delete("/:id", deletarQuadra);

export default router;