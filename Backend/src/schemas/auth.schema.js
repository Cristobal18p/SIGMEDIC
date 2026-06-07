import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    nombre_usuario: z
      .string({ required_error: "El nombre de usuario es obligatorio" })
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    contrasena: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
  }),
});
