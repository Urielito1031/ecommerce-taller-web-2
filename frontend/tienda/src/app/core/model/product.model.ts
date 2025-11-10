export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    imagenUrl: string;
    stock: number;
}
export interface ProductoConCantidad {
  id: number;
  productoId: number;
  cantidad: number;
  producto: Product;
}
