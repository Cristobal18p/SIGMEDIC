import * as AuthModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUsuario = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  if (!nombre_usuario || !contrasena) {
    return res.status(400).json({ message: "Usuario y contraseña requeridos" });
  }

  try {
    const usuario = await AuthModel.getUserByUsername(nombre_usuario);

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar contraseña con bcrypt
    // Si la DB tiene hash viejo sin bcrypt (para tests) y quieres que funcione el script temporal, bcrypt fallará si no es un hash válido.
    // Asumimos que ejecutaremos el script de hash_passwords.
    const isPasswordValid = await bcrypt.compare(contrasena, usuario.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET || "super_secreto_desarrollo",
      { expiresIn: "24h" }
    );

    // Set cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Remove password_hash from response
    delete usuario.password_hash;
    
    res.json({ usuario });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logoutUsuario = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.json({ message: "Sesión cerrada correctamente" });
};
