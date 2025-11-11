import { CategoriaDto } from "../categoria/categoriaDto";

export interface CarritoConItemsYTotalDto {
  usuarioId: number;
  items: Array<{
    id: number;
    productoId: number;
    cantidad: number;
    producto: {
      id: number;
      nombre: string;
      descripcion: string;
      precio: number;
      imagenUrl: string;
      stock: number;
      categoria: CategoriaDto;
    };
    total: number; // cantidad * producto.precio
  }>;
  // total del carrito (suma de los totales de cada item)
  total: number;
}