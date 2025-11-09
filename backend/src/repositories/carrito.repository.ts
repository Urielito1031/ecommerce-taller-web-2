import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";


export class CarritoRepository {
   
   async agregarProducto(usuarioId: number, productoId: number, cantidad: number):Promise<ItemCarritoConProducto> {
    const carrito = await prisma.carrito.upsert({
      where: { usuarioId },
      update: {},
      create: { usuarioId },
    });

    const itemExistente = await prisma.itemCarrito.findFirst({
      where: { carritoId: carrito.id, productoId },
    });

    if (itemExistente) {
      return prisma.itemCarrito.update({
        where: { id: itemExistente.id },
        data: { cantidad: itemExistente.cantidad + cantidad },
      include: { producto: true },  
      });
    }

    return prisma.itemCarrito.create({
      data: { carritoId: carrito.id, productoId, cantidad },
      include: { producto: true },
    });
  }

  async obtenerCarritoPorUsuario(usuarioId: number): Promise<CarritoConItemsYProductos | null> {
   const carrito = await  prisma.carrito.findUnique({
      where: { usuarioId },
      include: {
        items: {
          include: {
            producto: true,
          },
        },
      },
    });
    return carrito;
  }

  async limpiarCarrito(usuarioId: number): Promise<void> {
    const carrito = await prisma.carrito.findUnique({ where: { usuarioId } });

    if (carrito) {
      await prisma.itemCarrito.deleteMany({ where: { carritoId: carrito.id } });
    }
  }
}
//declaramos el type con los includes que retorna el repositorio, para que sea tipado
export type ItemCarritoConProducto = Prisma.ItemCarritoGetPayload<{
  include: { producto: true }
}>;

export type CarritoConItemsYProductos = Prisma.CarritoGetPayload<{
  include: {
    items: {
      include: {
        producto: true
      }
    }
  }
}>;
export const carritoRepository = new CarritoRepository();
