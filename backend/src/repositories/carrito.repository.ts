import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export class CarritoRepository {
  async agregarProducto(usuarioId: number, productoId: number, cantidad: number) {
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

  async obtenerCarritoPorUsuario(usuarioId: number) {
    return  await prisma.carrito.findUnique({
      where: { usuarioId },
      include: {
        items: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  async limpiarCarrito(usuarioId: number): Promise<void> {
    const carrito = await prisma.carrito.findUnique({ where: { usuarioId } });

    if (carrito) {
      await prisma.itemCarrito.deleteMany({ where: { carritoId: carrito.id } });
    }
  }
}

export const carritoRepository = new CarritoRepository();
