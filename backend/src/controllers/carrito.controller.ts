import { Request, Response } from "express";
import { carritoService } from "../services/carrito.service";

export class CarritoController {
  async agregarProducto(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const { productoId, cantidad } = req.body;

      await carritoService.agregarProducto(usuarioId, productoId, cantidad);
      
      // Devuelve el carrito completo actualizado
      const carritoActualizado = await carritoService.obtenerCarritoPorUsuario(usuarioId);
      res.status(201).json(carritoActualizado);
    } catch (error: any) {
      console.error('Error agregando producto:', error);
      
      if (error.message.includes('no existe')) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes('Stock insuficiente') || error.message.includes('Solo puedes agregar')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al agregar producto al carrito" });
      }
    }
  }

  async actualizarCantidadDeUnProducto(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const productoId = Number(req.params.productoId);
      const { cantidad } = req.body;

      const carritoActualizado = await carritoService.actualizarCantidadDeProducto(
        usuarioId,
        productoId,
        cantidad
      );

      res.status(200).json(carritoActualizado);

    } catch (error: any) {
      console.error('Error actualizando cantidad:', error);
      
      if (error.message.includes('no encontrado') || error.message.includes('no existe')) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes('Stock insuficiente')) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al actualizar cantidad del producto" });
      }
    }
  }



  async eliminarCantidadDeUnProducto(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const productoId = Number(req.params.productoId);
      const cantidad = Number(req.params.cantidad);

      await carritoService.eliminarCantidadDeUnProducto(usuarioId, productoId, cantidad);
      
      // Devuelve el carrito completo actualizado
      const carritoActualizado = await carritoService.obtenerCarritoPorUsuario(usuarioId);
      res.status(200).json(carritoActualizado);
    } catch (error: any) {
      console.error('Error eliminando cantidad:', error);
      
      if (error.message.includes('no encontrado')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al eliminar cantidad del producto" });
      }
    }
  }

  async obtenerCarritoPorUsuario(req: Request, res: Response): Promise<void> {
    const usuarioId = Number(req.params.usuarioId);
    const carrito = await carritoService.obtenerCarritoPorUsuario(usuarioId);

    if (!carrito) {
      res.status(404).json({ message: "Cargue productos para iniciar su carrito" });
      return;
    }

    res.status(200).json(carrito);
  }

  async limpiarCarrito(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.usuarioId);
      await carritoService.limpiarCarrito(usuarioId);
      res.status(200).json({ message: "Carrito limpiado exitosamente" });
    } catch (error: any) {
      console.error('Error limpiando carrito:', error);
      res.status(500).json({ message: "Error al limpiar el carrito" });
    }
  }

  async eliminarProductoEnCarrito(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const productoId = Number(req.params.productoId);

      await carritoService.eliminarProducto(usuarioId, productoId);
      
      // Devuelve el carrito completo actualizado
      const carritoActualizado = await carritoService.obtenerCarritoPorUsuario(usuarioId);
      res.status(200).json(carritoActualizado);
    } catch (error: any) {
      console.error('Error eliminando producto:', error);
      
      if (error.message.includes('no encontrado') || error.message.includes('no estaba')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al eliminar producto del carrito" });
      }
    }
  }
}

export const carritoController = new CarritoController();

