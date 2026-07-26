import { Router } from "express";
import { registrarUsuario, login } from "./authController.js";
import { autenticarUsuario } from "../middlewares/authMiddleware.js";
import { validarSchema } from "../middlewares/validateMiddleware.js";
import { registroSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/registrar", validarSchema(registroSchema), registrarUsuario);

router.post("/login", validarSchema(loginSchema), login);

router.get("/perfil", autenticarUsuario, (request, response) => {
  return response.status(200).json({
    mensagem: "Rota protegida acessada com sucesso!",
    usuario: request.usuario,
  });
});

export default router;
