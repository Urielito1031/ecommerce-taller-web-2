import { ProductoDto } from "../product/productoDto";

export interface ItemCarritoDto {
  id: number;
  productoId: number;
  cantidad: number;
   producto: ProductoDto;

  
}
