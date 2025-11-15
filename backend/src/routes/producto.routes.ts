import { Router } from 'express';
import multer from 'multer';
import {productoController}  from '../controllers/producto.controller';
import { productoValidationRules, validateProducto, validateProductoId } from '../middlewares/producto.middleware';

const router = Router();
const upload = multer({ dest: 'temp/' });

router.post(
  '/crear',
  upload.single('imagenFile'),
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
