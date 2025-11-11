import { Categoria } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CategoriaConProductos } from "../types/prisma-types";

export class CategoriaRepository {
  async getAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany({
      orderBy: { nombre: 'asc' }
    });
  }

  async obtenerPorId(id: number): Promise<CategoriaConProductos | null> {
    return prisma.categoria.findUnique({
      where: { id },
      include: {
        productos: {
          include: {
            categoria: true
          }
        }
      }
    });
  }

  async obtenerPorNombre(nombre: string): Promise<Categoria | null> {
    return prisma.categoria.findFirst({
      where: { nombre }
    });
  }

  async validarExiste(id: number): Promise<boolean> {
    const categoria = await prisma.categoria.findUnique({
      where: { id },
      select: { id: true }
    });
    return categoria !== null;
  }
}

export const categoriaRepository = new CategoriaRepository();