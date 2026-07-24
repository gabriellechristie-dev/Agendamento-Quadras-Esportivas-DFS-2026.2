import { Router } from "express";

import {
    registrarUsuario,
    login
} from "./authController.js";

import { autenticarUsuario } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/registrar", registrarUsuario);

router.post("/login", login);

router.get("/perfil", autenticarUsuario, (request, response) => {
    return response.status(200).json({
        mensagem: "Rota protegida acessada com sucesso!",
        usuario: request.usuario
    });
});

export default router;