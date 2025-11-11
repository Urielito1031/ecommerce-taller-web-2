import { Request, Response } from "express";
import { categoriaService } from "../services/categoria.service";

export class CategoriaController {
  async getAll(req: Request, res: Response) {
    try {
      const categoriasDto = await categoriaService.obtenerCategorias();
      return res.status(200).json(categoriasDto);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error al obtener categorías", 
        error 
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoriaDto = await categoriaService.obtenerCategoriaPorId(Number(id));
      
      if (!categoriaDto) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      return res.status(200).json(categoriaDto);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error al obtener categoría", 
        error 
      });
    }
  }
}

export const categoriaController = new CategoriaController();