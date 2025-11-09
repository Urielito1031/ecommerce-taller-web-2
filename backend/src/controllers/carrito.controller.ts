import { Request, Response } from "express";
import { carritoService } from "../services/carrito.service";
import { productoRepository } from "../repositories/producto.repository";
import { carritoRepository, ItemCarritoConProducto } from "../repositories/carrito.repository";
import { ItemCarritoDto } from "../dtos/carrito/itemCarritoDto";
import { prisma } from "../config/prisma";

export class CarritoController {
  async agregarProducto(req: Request, res: Response): Promise<void> {
    const usuarioId = Number(req.params.usuarioId);
    const { productoId, cantidad } = req.body;

    const producto = await productoRepository.getById(productoId);
    if (!producto) {
      res.status(404).json({ message: "El producto no existe" });
      return;
    }

    const carritoActual = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    const itemExistente = carritoActual?.items.find(i => i.productoId === productoId);
    const cantidadActual = itemExistente?.cantidad || 0;
    const cantidadTotal = cantidadActual + cantidad;

    if (cantidadTotal > producto.stock) {
      const disponible = producto.stock - cantidadActual;
      res.status(400).json({
        message: cantidadActual > 0
          ? `Ya tienes ${cantidadActual} unidades en el carrito. Solo puedes agregar ${disponible} más (stock disponible: ${producto.stock})`
          : `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles`
      });
      return;
    }

    const itemCarrito:ItemCarritoDto = await carritoService.agregarProducto(usuarioId, productoId, cantidad);
    res.status(201).json(itemCarrito);
  }

  async obtenerCarritoPorUsuario(req: Request, res: Response): Promise<void> {
    const usuarioId = Number(req.params.usuarioId);
    const carrito = await carritoService.obtenerCarritoPorUsuario(usuarioId);

    if (!carrito) {
      res.status(404).json({ message: "Carrito no encontrado" });
      return;
    }

    res.status(200).json(carrito);
  }
  async limpiarCarrito(req: Request, res: Response): Promise<void> {
      const usuarioId = Number(req.params.usuarioId);
      await carritoService.limpiarCarrito(usuarioId);
      res.status(200).json({ message: "Carrito limpiado exitosamente" });
  }
   async eliminarProductoEnCarrito(req: Request, res: Response): Promise<void> {
      const usuarioId = Number(req.params.usuarioId);
      const productoId = Number(req.params.productoId);

      const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
      if (!carrito) {
          res.status(404).json({ message: "Carrito no encontrado" });
          return;
      }
      const item: ItemCarritoConProducto | null = await carritoRepository.obtenerItemDelCarrito(usuarioId, productoId);
      if (!item) {
          res.status(404).json({ message: "Producto no estaba en el carrito" });
          return;
      }
      await carritoService.eliminarProducto(usuarioId, productoId);
    
      res.status(200).json({ message: "Producto eliminado del carrito exitosamente" });
  }
}

export const carritoController = new CarritoController();

