import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller";
import { agregarAlCarritoRules, actualizarCantidadRules, eliminarCantidadRules, eliminarProductoEnItemRules, validateCarrito } from "../middlewares/carrito.middleware";

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

router.put(
  "/:usuarioId/item/:productoId",
  actualizarCantidadRules,
  validateCarrito,
  carritoController.actualizarCantidadDeUnProducto
);

router.delete(
   "/:usuarioId/item/:productoId",
   eliminarProductoEnItemRules,
   validateCarrito,
   carritoController.eliminarProductoEnCarrito
);

//delete viejo, elimina cantidad de un producto del carrito
//eliminar a futuro, no usar
router.delete(
  "/:usuarioId/item/:productoId/cantidad/:cantidad",
  eliminarCantidadRules,
  validateCarrito,
  carritoController.eliminarCantidadDeUnProducto
);

export default router;