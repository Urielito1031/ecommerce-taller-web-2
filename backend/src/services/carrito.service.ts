import { CarritoConItemsYTotalDto } from "../dtos/carrito/carritoConItemsYTotalDto";
import { ItemCarritoDto } from "../dtos/carrito/itemCarritoDto";
import { carritoRepository } from "../repositories/carrito.repository";
import { ItemCarritoConProducto, CarritoConItemsYProductos } from "../types/prisma-types";
import { ProductoDto } from "../dtos/product/productoDto";

export class CarritoService {
  async agregarProducto(
    usuarioId: number,
    productoId: number,
    cantidad: number
  ): Promise<ItemCarritoDto> {
    const itemCarrito = await carritoRepository.agregarProducto(
      usuarioId,
      productoId,
      cantidad
    );

    return this.mapItemToDto(itemCarrito);
  }

  async obtenerCarritoPorUsuario(usuarioId: number): Promise<CarritoConItemsYTotalDto | null> {
    const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

    if (!carrito) {
      return null;
    }

    const itemsConTotal = carrito.items.map((item) => ({
      ...this.mapItemToDto(item),
      total: item.cantidad * item.producto.precio,
    }));

    return {
      usuarioId: carrito.usuarioId,
      items: itemsConTotal,
      total: itemsConTotal.reduce((acc, item) => acc + item.total, 0),
    };
  }

  async eliminarCantidadDeUnProducto(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    return carritoRepository.eliminarCantidadDeUnProducto(usuarioId, productoId, cantidad);
  }

  async eliminarProducto(usuarioId: number, productoId: number): Promise<void> {
    return carritoRepository.eliminarProducto(usuarioId, productoId);
  }

  async limpiarCarrito(usuarioId: number): Promise<void> {
    return carritoRepository.limpiarCarrito(usuarioId);
  }

  // MAPPER: Prisma Entity → DTO
  private mapItemToDto(item: ItemCarritoConProducto): ItemCarritoDto {
    return {
      id: item.id,
      productoId: item.productoId,
      cantidad: item.cantidad,
      producto: this.mapProductoToDto(item.producto),
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

export const carritoService = new CarritoService();
