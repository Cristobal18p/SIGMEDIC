import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getDisponibilidad,
  getDisponibilidadById,
  getDisponibilidadByMedico,
  createDisponibilidad,
  updateDisponibilidad,
  deleteDisponibilidad,
} from "../controllers/disponibilidad.controller.js";

const router = express.Router();
router.use(verifyToken);

router.get("/", getDisponibilidad);
router.get("/:id", getDisponibilidadById);
router.get("/medico/:id_medico", getDisponibilidadByMedico);
router.post("/", createDisponibilidad);
router.put("/:id", updateDisponibilidad);
router.delete("/:id", deleteDisponibilidad);

export default router;
