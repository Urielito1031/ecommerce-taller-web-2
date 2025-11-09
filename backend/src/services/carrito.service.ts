import { Prisma } from "@prisma/client";
import { CarritoDto } from "../dtos/carrito/carritoDto";
import { ItemCarritoDto } from "../dtos/carrito/itemCarritoDto";
import { CarritoConItemsYProductos, carritoRepository, ItemCarritoConProducto } from "../repositories/carrito.repository";





export class CarritoService{

   async agregarProducto(usuarioId: number, productoId: number, cantidad: number): Promise<ItemCarritoDto> {
      const itemCarrito: ItemCarritoConProducto = await carritoRepository.agregarProducto(usuarioId, productoId, cantidad);
      
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

   async obtenerCarritoPorUsuario(usuarioId: number): Promise<CarritoDto | null>{
      const carrito: CarritoConItemsYProductos | null = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

      if(!carrito){
         return null;
      }

      return {
         usuarioId: carrito.usuarioId,
         items: carrito.items.map((item) => ({
            id: item.id,
            productoId: item.productoId,
            cantidad: item.cantidad,
            producto: {
               id: item.producto.id,
               nombre: item.producto.nombre,
               descripcion: item.producto.descripcion,
               precio: item.producto.precio,
               imagenUrl: item.producto.imagenUrl,
               categoria: item.producto.categoria,
               stock: item.producto.stock,
            }
         }))
      };
   }
   
   async limpiarCarrito(usuarioId: number): Promise<void>{
      return carritoRepository.limpiarCarrito(usuarioId);
   }
}

export const carritoService = new CarritoService();