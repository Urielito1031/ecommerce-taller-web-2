import { Router } from 'express';
import {carritoController}  from '../controllers/carrito.controller';
import { } from '../middlewares/producto.middleware';

const router = Router();

router.post(
  '/agregar/:usuarioId',
  carritoController.agregarProducto
);

export default router;