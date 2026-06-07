import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getMedicos,
  getDisponibilidadPorMedico,
  createMedico,
  updateMedico,
  getMedicosDetalle,
} from "../controllers/medico.controller.js";

const router = express.Router();

router.get("/", getMedicos);
router.get("/detalle", verifyToken, getMedicosDetalle);
router.get("/:id/disponibilidad", getDisponibilidadPorMedico);
router.post("/", verifyToken, createMedico);
router.put("/:id", verifyToken, updateMedico);

export default router;
