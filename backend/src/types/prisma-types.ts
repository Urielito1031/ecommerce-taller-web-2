//el archivo prisma-types lo cree para evitar problemas en
//  los modelos definidos en Prisma que contengan relaciones a otras tablas
//podes ver mas informacion sobre lo que se está resolviendo en este link:
//https://stackoverflow.com/questions/68366105/get-full-type-on-prisma-client
import { Prisma } from "@prisma/client";

// DECLARA DE FORMA EXPLICITA LO QUE RETORNAN LOS REPOSITORIOS, PARA EVITAR ERRORES DE TIPO
// Tipos para Categoria con diferentes includes
export type CategoriaConProductos = Prisma.CategoriaGetPayload<{
  include: {
    productos: {
      include: {
        categoria: true;
      };
    };
  };
}>;

// Tipos para Producto con diferentes includes
export type ProductoConCategoria = Prisma.ProductoGetPayload<{
  include: {
    categoria: true;
  };
}>;

export type ItemCarritoConProducto = Prisma.ItemCarritoGetPayload<{
  include: {
    producto: {
      include: {
        categoria: true;
      };
    };
  };
}>;

export type CarritoConItemsYProductos = Prisma.CarritoGetPayload<{
  include: {
    items: {
      include: {
        producto: {
          include: {
            categoria: true;
          };
        };
      };
    };
  };
}>;
