import { ProductoCrearDto } from "../dtos/product/productoCrearDto";
import { productoService } from "../services/producto.service";
import { Request, Response } from "express";
import cloudinary from '../config/cloudinary';
import fs from 'fs';

export class ProductoController {
  async create(req: Request, res: Response) {
    try {
        const file = req.file;  
      
      if (!file) {
        return res.status(400).json({ message: "No se envió imagen" });
      }
      
      const tempPath = file.path; 
      
      const cloudinaryResult = await cloudinary.uploader.upload(tempPath, {
        folder: 'ecommerce/productos',
        use_filename: true
      });
      
      fs.unlinkSync(tempPath);
      
      const imagenUrl = cloudinaryResult.secure_url;



      const productoDto: ProductoCrearDto = {
        ...req.body,
         categoriaId: Number(req.body.categoriaId),  
         precio: Number(req.body.precio),          
         stock: Number(req.body.stock),  
      };
      
      productoDto.imagenUrl = imagenUrl;
      const nuevoProductoDto = await productoService.createProduct(productoDto);
      return res.status(201).json(nuevoProductoDto);
    } catch (error: any) {
      if (error.message.includes('no existe')) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ 
        message:  `Error al crear producto: ${JSON.stringify(req.body)}`, 
        error: error.message 
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      // usa query param 'categoriaId' para filtrar por categoría
      const { categoriaId } = req.query;
      
      let productosDto;
      if (categoriaId) {
        productosDto = await productoService.getProductsByCategoria(Number(categoriaId));
      } else {
        productosDto = await productoService.getAllProducts();
      }
      
      return res.status(200).json(productosDto);
    } catch (error: any) {
      if (error.message.includes('no existe')) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ 
        message: "Error al obtener productos", 
        error 
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productoDto = await productoService.getProductById(Number(id));
      
      if (!productoDto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      
      return res.status(200).json(productoDto);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error al obtener producto", 
        error 
      });
    }
  }
}

export const productoController = new ProductoController();

