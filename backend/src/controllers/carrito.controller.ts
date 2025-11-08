
import { carritoService } from "../services/carrito.service";
import { Request, Response } from "express";
import { ItemCarrito } from '@prisma/client';
import { ItemCarritoDto } from '../dtos/carrito/itemCarritoDto';


export class CarritoController {

   async agregarProducto(req: Request, res: Response) {


      const usuarioId: number = Number(req.params.usuarioId);
      const { productoId, cantidad }  = req.body;
      const itemCarrito = await carritoService.agregarProducto(usuarioId, productoId, cantidad);
      const ItemCarritoDto = mapToDto(itemCarrito)
      console.log(ItemCarritoDto)
      return res.status(201).json(ItemCarritoDto);

   }

   
   
}

export const carritoController = new CarritoController(); 



function mapToDto(itemCarrito: any): ItemCarritoDto {
   return {
      id: itemCarrito.id,
      productoId: itemCarrito.productoId,
      cantidad: itemCarrito.cantidad,
      producto: {
         id: itemCarrito.producto.id,
         nombre: itemCarrito.producto.nombre,
         descripcion: itemCarrito.producto.descripcion,
         precio: itemCarrito.producto.precio,
         imagenUrl: itemCarrito.producto.imagenUrl,
         categoria: itemCarrito.producto.categoria,
         stock: itemCarrito.producto.stock,
      }
   };
}

