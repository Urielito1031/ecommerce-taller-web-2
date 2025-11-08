import { Router } from 'express';
import {productoController}  from '../controllers/producto.controller';
import { productoValidationRules, validateProducto, validateProductoId } from '../middlewares/producto.middleware';

const router = Router();

router.post(
  '/crear',
  productoValidationRules,
  validateProducto,
  productoController.create
);

router.get('/', productoController.getAll);
router.get('/:id',
    validateProductoId,
   validateProducto,
   productoController.getById);

export default router;