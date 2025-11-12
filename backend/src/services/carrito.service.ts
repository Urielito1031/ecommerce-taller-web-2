import { CarritoConItemsYTotalDto } from "../dtos/carrito/carritoConItemsYTotalDto";
import { ItemCarritoDto } from "../dtos/carrito/itemCarritoDto";
import { carritoRepository } from "../repositories/carrito.repository";
import { productoRepository } from "../repositories/producto.repository";
import { ItemCarritoConProducto } from "../types/prisma-types";
import { ProductoDto } from "../dtos/product/productoDto";

export class CarritoService {
  async agregarProducto(
    usuarioId: number,
    productoId: number,
    cantidad: number
  ): Promise<ItemCarritoDto> {
    // Validar que el producto existe
    const producto = await productoRepository.getById(productoId);
    if (!producto) {
      throw new Error("El producto no existe");
    }

    // Validar stock disponible
    const carritoActual = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    const itemExistente = carritoActual?.items.find(i => i.productoId === productoId);
    const cantidadActual = itemExistente?.cantidad || 0;
    const cantidadTotal = cantidadActual + cantidad;

    if (cantidadTotal > producto.stock) {
      const disponible = producto.stock - cantidadActual;
      throw new Error(
        cantidadActual > 0
          ? `Ya tienes ${cantidadActual} unidades en el carrito. Solo puedes agregar ${disponible} más (stock disponible: ${producto.stock})`
          : `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles`
      );
    }

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

  async actualizarCantidadDeProducto(
    usuarioId: number,
    productoId: number,
    cantidad: number
  ): Promise<CarritoConItemsYTotalDto> {
    const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    const item = carrito.items.find(i => i.productoId === productoId);
    if (!item) {
      throw new Error("Producto no encontrado en el carrito");
    }

    const producto = await productoRepository.getById(productoId);
    if (!producto) {
      throw new Error("El producto no existe");
    }

    if (cantidad > producto.stock) {
      throw new Error(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles`);
    }

    await carritoRepository.actualizarCantidadDeProducto(usuarioId, productoId, cantidad);

    const carritoActualizado = await this.obtenerCarritoPorUsuario(usuarioId);
    if (!carritoActualizado) {
      throw new Error("Error al obtener carrito actualizado");
    }

    return carritoActualizado;
  }

  async eliminarCantidadDeUnProducto(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    const item = carrito.items.find(i => i.productoId === productoId);
    if (!item) {
      throw new Error("Producto no encontrado en el carrito");
    }

    await carritoRepository.eliminarCantidadDeUnProducto(usuarioId, productoId, cantidad);
  }

  async eliminarProducto(usuarioId: number, productoId: number): Promise<void> {
    const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    const item = carrito.items.find(i => i.productoId === productoId);
    if (!item) {
      throw new Error("Producto no estaba en el carrito");
    }

    await carritoRepository.eliminarProducto(usuarioId, productoId);
  }

  async limpiarCarrito(usuarioId: number): Promise<void> {
    const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    await carritoRepository.limpiarCarrito(usuarioId);
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
