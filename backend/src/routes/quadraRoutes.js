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
import { validarSchema } from "../middlewares/validateMiddleware.js";
import {
  criarQuadraSchema,
  atualizarQuadraSchema,
} from "../schemas/quadraSchema.js";

const router = Router();

router.post(
  "/",
  //autenticarUsuario,
  //permitirTipos("ADMIN"),
  validarSchema(criarQuadraSchema),
  criarQuadra,
);

router.get("/", listarQuadras);

router.get("/:id", buscarQuadraPorId);

router.put(
  "/:id",
  autenticarUsuario,
  permitirTipos("ADMIN"),
  validarSchema(atualizarQuadraSchema),
  atualizarQuadra,
);

router.delete("/:id", autenticarUsuario, permitirTipos("ADMIN"), deletarQuadra);

export default router;
