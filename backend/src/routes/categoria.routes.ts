import { Router } from 'express';
import { categoriaController } from '../controllers/categoria.controller';
import { validateCategoriaId } from '../middlewares/categoria.middleware';

const router = Router();

router.get('/', categoriaController.getAll);
router.get('/:id', validateCategoriaId, categoriaController.getById);

export default router;
