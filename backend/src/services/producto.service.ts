import { ProductoCrearDto } from "../dtos/product/productoCrearDto";
import { ProductoDto } from "../dtos/product/productoDto";
import { productoRepository } from "../repositories/producto.repository";
import { categoriaService } from "./categoria.service";
import { ProductoConCategoria } from "../types/prisma-types";

export class ProductoService {
  async createProduct(productoDto: ProductoCrearDto): Promise<ProductoDto> {
    // Validar que la categoría existe
    const categoriaExiste = await categoriaService.validarCategoriaExiste(productoDto.categoriaId);
    if (!categoriaExiste) {
      throw new Error(`Categoría con ID ${productoDto.categoriaId} no existe`);
    }

    const nuevoProducto = await productoRepository.create(productoDto);
    return this.mapToDto(nuevoProducto);
  }

  async getAllProducts(): Promise<ProductoDto[]> {
    const productos = await productoRepository.getAll();
    return productos.map(prod => this.mapToDto(prod));
  }

  async getProductById(id: number): Promise<ProductoDto | null> {
    const producto = await productoRepository.getById(id);
    if (!producto) return null;
    return this.mapToDto(producto);
  }

  async getProductsByCategoria(categoriaId: number): Promise<ProductoDto[]> {
    const categoriaExiste = await categoriaService.validarCategoriaExiste(categoriaId);
    if (!categoriaExiste) {
      throw new Error(`Categoría con ID ${categoriaId} no existe`);
    }

    const productos = await productoRepository.getByCategoriaId(categoriaId);
    return productos.map(prod => this.mapToDto(prod));
  }

  // MAPPER: Prisma Entity → DTO
  private mapToDto(producto: ProductoConCategoria): ProductoDto {
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

export const productoService = new ProductoService();
