import { ItemCarrito } from "@prisma/client";
import { prisma } from "../config/prisma";

export class CarritoRepository{
   async agregarProducto(usuarioId:number,productoId:number,cantidad:number):Promise<ItemCarrito>{
      const carrito = await prisma.carrito.upsert({
      where: { usuarioId },
      update: {},
      create: { usuarioId },
    });
      const itemExistente = await prisma.itemCarrito.findFirst({
      where: { carritoId: carrito.id, productoId: productoId },
    });
    if(itemExistente){
      return prisma.itemCarrito.update({
        where: { id: itemExistente.id },
        data: { cantidad: itemExistente.cantidad + cantidad },
      });
    }
    return prisma.itemCarrito.create({
      data: {
         carritoId: carrito.id, 
         productoId: productoId,
         cantidad : cantidad
      }
    })
   }
   async obtenerCarritoPorUsuario(usuarioId: number):Promise<ItemCarrito[] | null>{
      const carrito =  await prisma.carrito.findUnique({
         where: { usuarioId },
         include: { items: true },
      });
      if(!carrito){
         return null;
      }
      return carrito.items;
   }

   async limpiarCarrito(usuarioId:number):Promise<void>{
      const carrito = await prisma.carrito.findUnique({
         where: { usuarioId },
      });
      if(carrito){
         await prisma.itemCarrito.deleteMany({
            where: { carritoId: carrito.id }
         });   
      }
   }
}