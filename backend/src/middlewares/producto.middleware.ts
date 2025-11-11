import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const productoValidationRules = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),

  body('categoriaId')
    .notEmpty().withMessage('El ID de categoría es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID de categoría debe ser un número entero mayor a 0'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),

  body('imagenUrl')
    .notEmpty().withMessage('La URL de la imagen es obligatoria')
    .isURL().withMessage('La URL de la imagen no es válida'),

  body('stock')
    .notEmpty().withMessage('El stock es obligatorio')
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero igual o mayor a 0'),
];

export const validateProductoId = [
  param('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor a 0'),
];
export const validateProducto = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Error de validación en los campos',
      details: errors.array({ onlyFirstError: true }),
    });
    return;
  }
  next();
};
