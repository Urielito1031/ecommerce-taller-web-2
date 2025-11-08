import { CarritoDto } from "../dtos/carrito/carritoDto";
import { carritoRepository } from "../repositories/carrito.repository";


export class CarritoService{

   async agregarProducto(usuarioId:number,productoId:number,cantidad:number):Promise<any>{
       return carritoRepository.agregarProducto(usuarioId,productoId,cantidad);
   }

   async obtenerCarritoPorUsuario(usuarioId:number):Promise<CarritoDto | null>{
      const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

      if(!carrito){
         return null;
      }

      return {
         usuarioId: carrito.usuarioId,
         items: mapToDto(carrito)
      };
   }
   
   async limpiarCarrito(usuarioId:number):Promise<void>{
      return carritoRepository.limpiarCarrito(usuarioId);
   }
}

function mapToDto(carrito: { items: ({ producto: { id: number; creadoEn: Date; nombre: string; descripcion: string; categoria: string; precio: number; imagenUrl: string; stock: number; }; } & { id: number; carritoId: number; productoId: number; cantidad: number; })[]; } & { id: number; usuarioId: number; creadoEn: Date; }): import("e:/Development/unlam/Taller-web2/proyecto-practica/backend/src/dtos/carrito/itemCarritoDto").ItemCarritoDto[] {
   return carrito.items.map((item) => ({
      id: item.id,
      productoId: item.productoId,
      cantidad: item.cantidad,
      producto: {
         id: item.producto.id,
         nombre: item.producto.nombre,
         descripcion: item.producto.descripcion,
         precio: item.producto.precio,
         imagenUrl: item.producto.imagenUrl,
         categoria: item.producto.categoria,
         stock: item.producto.stock,
      }
   }));
}
export const carritoService = new CarritoService();