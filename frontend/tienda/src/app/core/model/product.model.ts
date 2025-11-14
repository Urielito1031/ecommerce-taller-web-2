import { Categoria } from "./categoria.model";

export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    stock: number;
      categoria: Categoria; 

}
export interface ProductoConCantidad {
  id: number;
  productoId: number;
  cantidad: number;
  producto: Product;
}
