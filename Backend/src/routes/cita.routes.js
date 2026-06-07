import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCitaSchema } from "../schemas/cita.schema.js";
import {
  createCita,
  ObtenerCitaPorSeguimiento,
  obtenerCitas,
  cancelarCitaController,
  getCitas,
  updateCitaController,
  confirmarCitaController,
  getCitasMedicos,
  actualizarEstadoCitaController,
} from "../controllers/cita.controller.js";

const router = express.Router();

router.post("/", validate(createCitaSchema), createCita);
router.get("/seguimiento/:numero", ObtenerCitaPorSeguimiento);
router.put("/:numero/cancelar", cancelarCitaController);
// Listado con filtros
router.get("/", verifyToken, obtenerCitas);
// Listado completo
router.get("/todas", verifyToken, getCitas);
// Actualizar una cita por id (relativo al prefijo /api/citas)
router.put("/:id", verifyToken, updateCitaController);
// Actualizar sólo el estado
router.put("/:id/estado", verifyToken, actualizarEstadoCitaController);
// Confirmar cita
router.put("/:id_cita/confirmar", verifyToken, confirmarCitaController);

router.get("/medico/:id_medico", verifyToken, getCitasMedicos);
export default router;
