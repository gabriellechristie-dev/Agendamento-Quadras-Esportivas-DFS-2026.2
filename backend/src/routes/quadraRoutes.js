import { Router } from "express";
import {
  criarQuadra,
  listarQuadras,
  buscarQuadraPorId,
  atualizarQuadra,
  deletarQuadra,
} from "../controllers/quadraController.js";
import { autenticarUsuario } from "../middlewares/authMiddleware.js";
import { permitirTipos } from "../middlewares/roleMiddleware.js";

const router = Router();

router.post(
  "/",
  autenticarUsuario,
  permitirTipos("ADMIN"),
  criarQuadra
);

router.get("/", listarQuadras);

router.get("/:id", buscarQuadraPorId);

router.put(
  "/:id",
  autenticarUsuario,
  permitirTipos("ADMIN"),
  atualizarQuadra
);

router.delete(
  "/:id",
  autenticarUsuario,
  permitirTipos("ADMIN"),
  deletarQuadra
);