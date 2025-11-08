import { ProductoCrearDto } from "../dtos/product/productoCrearDto";
import { Producto } from "../entities/producto.model";
import { productoRepository } from "../repositories/producto.repository";

export class ProductoService {


   async createProduct(productoDto:ProductoCrearDto): Promise<Producto> {
      return  productoRepository.create(productoDto);
   }

   async getAllProducts(): Promise<Producto[] | null> {
      return productoRepository.getAll();
   }
   async getProductById(id: number): Promise<Producto | null> {
      return productoRepository.getById(id);
   }
}
export const productoService = new ProductoService();
