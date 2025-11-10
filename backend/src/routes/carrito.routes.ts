import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller";
import { agregarAlCarritoRules, eliminarCantidadRules, eliminarProductoEnItemRules, validateCarrito } from "../middlewares/carrito.middleware";

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
   eliminarProductoEnItemRules,
   validateCarrito,
   carritoController.eliminarProductoEnCarrito
)

router.delete(
  "/:usuarioId/item/:productoId/cantidad/:cantidad",
  eliminarCantidadRules,
  validateCarrito,
  carritoController.eliminarCantidadDeUnProducto
)


export default router;