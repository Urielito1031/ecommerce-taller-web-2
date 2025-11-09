import { CarritoDto } from "../dtos/carrito/carritoDto";
import { ItemCarritoDto } from "../dtos/carrito/itemCarritoDto";
import {
  CarritoConItemsYProductos,
  carritoRepository,
  ItemCarritoConProducto,
} from "../repositories/carrito.repository";

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

  async obtenerCarritoPorUsuario(usuarioId: number): Promise<CarritoDto | null> {
    const carrito: CarritoConItemsYProductos | null =
      await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

    if (!carrito) {
      return null;
    }

    return {
      usuarioId: carrito.usuarioId,
      items: carrito.items.map((item) => this.mapItemToDto(item)),
    };
  }
  async eliminarProducto(usuarioId:number, productoId:number):Promise<void>{
      return carritoRepository.eliminarProducto(usuarioId, productoId);
  }

  async limpiarCarrito(usuarioId: number): Promise<void> {
    return carritoRepository.limpiarCarrito(usuarioId);
  }

  private mapItemToDto(item: ItemCarritoConProducto): ItemCarritoDto {
    return {
      id: item.id,
      productoId: item.productoId,
      cantidad: item.cantidad,
      producto: {
        id: item.producto.id,
        nombre: item.producto.nombre,
        descripcion: item.producto.descripcion,
        precio: item.producto.precio,
        imagenUrl: item.producto.imagenUrl,
        categoria: item.producto.categoria,
        stock: item.producto.stock,
      },
    };
  }
}

export const carritoService = new CarritoService();
