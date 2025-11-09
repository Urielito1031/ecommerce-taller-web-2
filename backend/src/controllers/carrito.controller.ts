
import { carritoService } from "../services/carrito.service";
import { Request, Response } from "express";
import { ItemCarritoDto } from '../dtos/carrito/itemCarritoDto';
import { CarritoDto } from "../dtos/carrito/carritoDto";


export class CarritoController {

   async agregarProducto(req: Request, res: Response) {
      const usuarioId: number = Number(req.params.usuarioId);
      const { productoId, cantidad } = req.body;
      const itemCarrito:ItemCarritoDto = await carritoService.agregarProducto(usuarioId, productoId, cantidad);
      
      return res.status(201).json(itemCarrito);
   }

   async obtenerCarritoPorUsuario(req: Request, res: Response) {
      const usuarioId: number = Number(req.params.usuarioId);
      const carrito: CarritoDto | null = await carritoService.obtenerCarritoPorUsuario(usuarioId);
      
      if (!carrito) {
         return res.status(404).json({ message: "Carrito no encontrado" });
      }
      
      return res.status(200).json(carrito);
   }
}

export const carritoController = new CarritoController();

