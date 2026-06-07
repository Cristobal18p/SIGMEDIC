import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPacienteSchema } from "../schemas/paciente.schema.js";
import {
  crearPaciente,
  validarPaciente,getPaciente, getPacientes
} from "../controllers/paciente.controller.js";

const router = express.Router();



router.post("/", validate(createPacienteSchema), crearPaciente);
router.post("/validar", validarPaciente);
router.get("/:cedula", getPaciente);
router.get("/", verifyToken, getPacientes);

export default router;
