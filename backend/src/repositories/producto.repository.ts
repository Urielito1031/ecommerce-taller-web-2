import { prisma } from "../config/prisma";
import { ProductoCrearDto } from "../dtos/product/productoCrearDto";
import { ProductoConCategoria } from "../types/prisma-types";

export class ProductoRepository {
  async getAll(): Promise<ProductoConCategoria[]> {
    return prisma.producto.findMany({
      include: {
        categoria: true
      },
      orderBy: {
        creadoEn: 'desc'
      }
    });
  }

  async getById(id: number): Promise<ProductoConCategoria | null> {
    return prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true
      }
    });
  }

  async getByCategoriaId(categoriaId: number): Promise<ProductoConCategoria[]> {
    return prisma.producto.findMany({
      where: { categoriaId },
      include: {
        categoria: true
      },
      orderBy: {
        creadoEn: 'desc'
      }
    });
  }

  async create(product: ProductoCrearDto): Promise<ProductoConCategoria> {
    return prisma.producto.create({
      data: {
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        imagenUrl: product.imagenUrl,
        stock: product.stock,
        categoriaId: product.categoriaId
      },
      include: {
        categoria: true
      }
    });
  }
}

export const productoRepository = new ProductoRepository();
