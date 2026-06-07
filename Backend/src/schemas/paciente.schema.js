import { z } from "zod";

export const createPacienteSchema = z.object({
  body: z.object({
    cedula: z
      .string({ required_error: "La cédula es obligatoria" })
      .min(10, "La cédula debe tener al menos 10 caracteres"),
    nombres: z
      .string({ required_error: "Los nombres son obligatorios" })
      .min(2, "Los nombres deben ser válidos"),
    apellidos: z
      .string({ required_error: "Los apellidos son obligatorios" })
      .min(2, "Los apellidos deben ser válidos"),
    fecha_nacimiento: z.string({
      required_error: "La fecha de nacimiento es obligatoria",
    }),
    telefono: z.string().optional(),
    correo_electronico: z
      .string()
      .email("Debe ser un correo electrónico válido")
      .optional()
      .or(z.literal("")),
    direccion: z.string().optional(),
  }),
});
