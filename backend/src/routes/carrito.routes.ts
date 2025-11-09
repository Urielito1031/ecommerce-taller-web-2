import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller";
import { agregarAlCarritoRules, validateCarrito } from "../middlewares/carrito.middleware";

const router = Router();

router.post(
  "/agregar/:usuarioId",
  agregarAlCarritoRules,
  validateCarrito,
  carritoController.agregarProducto
);

router.get(
  "/:usuarioId",

  carritoController.obtenerCarritoPorUsuario
);
router.delete(
   "/:usuarioId/item/:productoId",
   carritoController.eliminarProductoEnCarrito
)

export default router;