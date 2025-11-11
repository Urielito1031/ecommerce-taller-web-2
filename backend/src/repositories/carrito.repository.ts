import { prisma } from "../config/prisma";
import { ItemCarritoConProducto, CarritoConItemsYProductos } from "../types/prisma-types";

export class CarritoRepository {
  async obtenerItemDelCarrito(usuarioId: number, productoId: number): Promise<ItemCarritoConProducto | null> {
    const carrito = await prisma.carrito.findUnique({
      where: { usuarioId },
    });

    if (!carrito) {
      return null;
    }

    const item = await prisma.itemCarrito.findFirst({
      where: { carritoId: carrito.id, productoId },
      include: {
        producto: {
          include: {
            categoria: true
          }
        }
      },
    });

    return item;
  }

  async agregarProducto(
    usuarioId: number,
    productoId: number,
    cantidad: number
  ): Promise<ItemCarritoConProducto> {
    const carrito = await prisma.carrito.upsert({
      where: { usuarioId },
      update: {},
      create: { usuarioId },
    });

    return prisma.itemCarrito.upsert({
      where: {
        carritoId_productoId: {
          carritoId: carrito.id,
          productoId: productoId,
        },
      },
      update: {
        cantidad: { increment: cantidad },
      },
      create: {
        carritoId: carrito.id,
        productoId: productoId,
        cantidad: cantidad,
      },
      include: {
        producto: {
          include: {
            categoria: true
          }
        }
      },
    });
  }

  async obtenerCarritoPorUsuario(
    usuarioId: number
  ): Promise<CarritoConItemsYProductos | null> {
    return prisma.carrito.findUnique({
      where: { usuarioId },
      include: {
        items: {
          include: {
            producto: {
              include: {
                categoria: true
              }
            },
          },
        },
      },
    });
  }

  async eliminarCantidadDeUnProducto(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    const carrito = await prisma.carrito.findUnique({
      where: { usuarioId },
      include: {
        items: {
          include: {
            producto: {
              include: {
                categoria: true
              }
            }
          }
        }
      }
    });

    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    const item = carrito.items.find(item => item.productoId === productoId);
    if (!item) {
      throw new Error("Producto no encontrado en el carrito");
    }

    const nuevaCantidad = item.cantidad - cantidad;
    if (nuevaCantidad <= 0) {
      await prisma.itemCarrito.delete({
        where: { id: item.id }
      });
    } else {
      await prisma.itemCarrito.update({
        where: { id: item.id },
        data: { cantidad: nuevaCantidad }
      });
    }
  }

  async eliminarProducto(usuarioId: number, productoId: number): Promise<void> {
    const carrito = await prisma.carrito.findUnique({
      where: { usuarioId },
    });

    if (carrito) {
      await prisma.itemCarrito.deleteMany({
        where: { carritoId: carrito.id, productoId },
      });
    }
  }

  async limpiarCarrito(usuarioId: number): Promise<void> {
    const carrito = await prisma.carrito.findUnique({
      where: { usuarioId },
    });

    if (carrito) {
      await prisma.itemCarrito.deleteMany({
        where: { carritoId: carrito.id },
      });
    }
  }
}

export const carritoRepository = new CarritoRepository();
