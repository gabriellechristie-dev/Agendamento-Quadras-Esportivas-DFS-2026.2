import { Router } from "express";
import { registrarUsuario } from "./authController.js";

const router = Router();

router.post("/register", registrarUsuario);

export default router;