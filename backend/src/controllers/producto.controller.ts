import { ProductoCrearDto } from "../dtos/product/productoCrearDto";
import { Producto } from "../entities/producto.model";
import { productoService } from "../services/producto.service";
import { Request, Response } from "express";


export class ProductoController {
   async create(req: Request, res: Response) {
      const productoDto: ProductoCrearDto = req.body;
      const nuevoProducto = await productoService.createProduct(productoDto);
      return res.status(201).json(nuevoProducto);
   }

   async getAll(req: Request, res: Response) {
      const productos = await productoService.getAllProducts();
      const productosDto = mapToDtos(productos);
      return res.status(200).json(productosDto);
   }

   async getById(req: Request, res: Response) {
      const { id } = req.params;
      const producto = await productoService.getProductById(Number(id));
      const productoDto = mapToDto(producto);
      if (!producto) {
         return res.status(404).json({ message: "Producto no encontrado" });
      }
      return res.status(200).json(productoDto);
   }
   
}

export const productoController = new ProductoController(); 


function mapToDto(producto: Producto | null) {
   if (!producto) {
      return null;
   }
   return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precio: producto.precio,
      imagenUrl: producto.imagenUrl,
      stock: producto.stock
   };
}

function mapToDtos(productos: Producto[] | null) {
   return productos?.map(producto => (mapToDto(producto)));
};

