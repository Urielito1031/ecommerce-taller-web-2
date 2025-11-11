import { param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCategoriaId = [
  param('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor a 0'),
  
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'Error de validación',
        details: errors.array({ onlyFirstError: true })
      });
      return;
    }
    next();
  }
];
