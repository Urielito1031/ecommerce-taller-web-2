import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const agregarAlCarritoRules = [
  param("usuarioId")
    .notEmpty().withMessage("El usuarioId es obligatorio")
    .isInt({ gt: 0 }).withMessage("usuarioId debe ser entero > 0"),
  body("productoId")
    .notEmpty().withMessage("El productoId es obligatorio")
    .isInt({ gt: 0 }).withMessage("productoId debe ser entero > 0"),
  body("cantidad")
    .notEmpty().withMessage("La cantidad es obligatoria")
    .isInt({ gt: 0 }).withMessage("La cantidad debe ser un entero > 0"),
];

export const validateCarrito = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Error de validación en los campos",
      details: errors.array({ onlyFirstError: true }),
    });
    return;
  }
  next();
};