import { z } from "zod";

export const createCitaSchema = z.object({
  body: z.object({
    id_paciente: z.string({ required_error: "El ID del paciente es obligatorio" }),
    id_medico: z.string({ required_error: "El ID del médico es obligatorio" }),
    fecha_cita: z.string({ required_error: "La fecha de la cita es obligatoria" }),
    hora_cita: z.string({ required_error: "La hora de la cita es obligatoria" }),
    motivo: z.string().optional(),
    creado_por: z.enum(["paciente", "recepcion"], {
      required_error: "El creador (paciente o recepcion) es obligatorio",
    }),
  }),
});
