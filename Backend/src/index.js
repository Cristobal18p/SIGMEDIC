import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Importar rutas
import pacienteRoutes from "./routes/paciente.routes.js";
import medicoRoutes from "./routes/medico.routes.js";
import citaRoutes from "./routes/cita.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import especialidadesRoutes from "./routes/especialidad.routes.js";
import authRoutes from "./routes/auth.routes.js";
import historialRoutes from "./routes/historial.routes.js";
import disponibilidadRoutes from "./routes/disponibilidad.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

// Importar jobs eliminados por desactivación de notificaciones

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Limitador Global
const limiterGlobal = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 300, // Limitar cada IP a 300 peticiones por ventana
  message: { message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos." },
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use(limiterGlobal);

// Limitador Estricto para Login (Fuerza Bruta)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Límite de 5 intentos (exitosos o fallidos) por ventana
  message: { message: "Demasiados intentos de inicio de sesión. Cuenta temporalmente bloqueada, intenta de nuevo en 15 minutos." },
  standardHeaders: true, 
  legacyHeaders: false,
});

// Rutas principales
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/medicos", medicoRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/especialidades", especialidadesRoutes);
app.use("/api/auth/login", authLimiter); // Aplicar firewall estricto solo a login
app.use("/api/auth", authRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/disponibilidad", disponibilidadRoutes);

app.get("/api", (req, res) =>
  res.send("API Clínica Médica funcionando correctamente")
);

// Servir frontend en producción
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../Frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/build/index.html"));
});

// Registrar manejador de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
