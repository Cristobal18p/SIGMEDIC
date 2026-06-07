export const errorHandler = (err, req, res, next) => {
  console.error("Error capturado por errorHandler:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    status: "error",
    message: message,
    details: err.details || null, // Para detalles de validación de Zod
  });
};
