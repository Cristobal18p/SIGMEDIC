export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    // Si Zod detecta un error de validación, formateamos los detalles
    const errorMessages = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    
    // Pasamos el error al manejador global
    const customError = new Error("Datos de entrada inválidos");
    customError.statusCode = 400;
    customError.details = errorMessages;
    next(customError);
  }
};
