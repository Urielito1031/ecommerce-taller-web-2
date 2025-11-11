import { CategoriaDto } from "../categoria/categoriaDto";


export interface ProductoDto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  stock: number;
  categoria: CategoriaDto;
}