import { Product } from "./product.model";

export interface Cart{
  id: number,
  products: Product[],
  totalPrice: number
}