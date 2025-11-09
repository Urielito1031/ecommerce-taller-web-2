import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import {
  loginValidationRules,
  registerValidationRules,
  validate,
} from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/register",
  registerValidationRules,
  validate,
  authController.register
);

router.post(
  "/login",
  loginValidationRules,
  validate,
  authController.login
);

export default router;