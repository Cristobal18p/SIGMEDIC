import { Router } from "express";
import { loginUsuario, logoutUsuario } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validate(loginSchema), loginUsuario);
router.post("/logout", logoutUsuario);

export default router;
