import { Router } from 'express';
import {productoController}  from '../controllers/producto.controller';

const router = Router();

router.post('/crear', productoController.create);
router.get('/', productoController.getAll);
router.get('/:id', productoController.getById);

export default router;