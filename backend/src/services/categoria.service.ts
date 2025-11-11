import { Categoria } from "@prisma/client";
import { categoriaRepository } from "../repositories/categoria.repository";
import { CategoriaDto, CategoriaConProductosDto } from "../dtos/categoria/categoriaDto";
import { CategoriaConProductos } from "../types/prisma-types";
import { ProductoDto } from "../dtos/product/productoDto";

export class CategoriaService {
  // Obtener todas las categorías (sin productos)
  async obtenerCategorias(): Promise<CategoriaDto[]> {
    const categorias = await categoriaRepository.getAll();
    return categorias.map(cat => this.mapToDto(cat));
  }

  // Obtener categoría por ID (con productos)
  async obtenerCategoriaPorId(id: number): Promise<CategoriaConProductosDto | null> {
    const categoria = await categoriaRepository.obtenerPorId(id);
    if (!categoria) return null;
    return this.mapToDtoConProductos(categoria);
  }

  // Validar que una categoría existe
  async validarCategoriaExiste(categoriaId: number): Promise<boolean> {
    return categoriaRepository.validarExiste(categoriaId);
  }

  // MAPPERS: Prisma Entity → DTO
  private mapToDto(categoria: Categoria): CategoriaDto {
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      icono: categoria.icono
    };
  }

  private mapToDtoConProductos(categoria: CategoriaConProductos): CategoriaConProductosDto {
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      icono: categoria.icono,
      productos: categoria.productos.map(prod => this.mapProductoToDto(prod))
    };
  }

  private mapProductoToDto(producto: any): ProductoDto {
    return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagenUrl: producto.imagenUrl,
      stock: producto.stock,
      categoria: {
        id: producto.categoria.id,
        nombre: producto.categoria.nombre,
        icono: producto.categoria.icono
      }
    };
  }
}

export const categoriaService = new CategoriaService();