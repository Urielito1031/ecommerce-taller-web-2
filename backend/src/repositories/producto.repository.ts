import { Producto } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ProductoCrearDto } from "../dtos/product/productoCrearDto";

export class ProductoRepository {



  async getAll(): Promise<Producto[]> {
    return prisma.producto.findMany();
  }

  async getById(id: number): Promise<Producto | null> {
    return prisma.producto.findUnique({ where: { id } });
  }

  async create(product: ProductoCrearDto): Promise<Producto> {
    return prisma.producto.create({ data: product });
  }
}

export const productoRepository = new ProductoRepository();
