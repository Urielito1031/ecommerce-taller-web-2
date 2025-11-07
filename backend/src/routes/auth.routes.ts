import {Router} from 'express'
import * as authController from "../controllers/auth.controller";
import { loginValidationRules, registerValidationRules, validate } from '../middlewares/auth.middleware';

const router = Router();

router.post(
   '/register',
   registerValidationRules,
   validate,
   authController.register
);


router.post(
   '/login',
   //aplica las reglas de validacion
   loginValidationRules,
   //ejecuta el chequeo y frena si hay un error
   validate,
   //recien ahi, va al controlador
    authController.login
);


export default router;