const express = require("express");
const router = express.Router();
const quadraController = require("../controllers/quadraController");

router.post("/", quadraController.criarQuadra);
router.get("/", quadraController.listarQuadras);
router.get("/:id", quadraController.buscarQuadraPorId);
router.put("/:id", quadraController.atualizarQuadra);
router.delete("/:id", quadraController.deletarQuadra);

module.exports = router;
