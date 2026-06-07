import pool from "../config/db.js";

export const getUserByUsername = async (nombre_usuario) => {
  const result = await pool.query(
    `SELECT 
      u.id_usuario,
      u.nombre_usuario,
      u.password_hash,
      u.nombre || ' ' || u.apellido AS nombre_completo,
      u.rol,
      u.estado,
      m.id_medico
    FROM usuario_sistema u
    LEFT JOIN medicos m ON m.id_usuario = u.id_usuario
    WHERE u.nombre_usuario = $1`,
    [nombre_usuario]
  );

  return result.rows[0] || null;
};
