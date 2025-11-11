import { ProductoDto } from "../product/productoDto";

export interface CategoriaDto {
  id: number;
  nombre: string;
  icono: string | null;
}

export interface CategoriaConProductosDto extends CategoriaDto {
  productos: ProductoDto[];
}