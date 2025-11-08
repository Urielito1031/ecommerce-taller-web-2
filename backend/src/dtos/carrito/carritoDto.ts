import { ItemCarritoDto } from "./itemCarritoDto";

export interface CarritoDto {
  usuarioId: number;
  items: ItemCarritoDto[];
}
