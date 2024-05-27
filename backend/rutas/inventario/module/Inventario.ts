import { PrismaClient } from "@prisma/client";
import { IActualizarLibroParams, IAgregarLibroParams } from "./types";

const prisma = new PrismaClient();

export class Inventario {
  async agregarLibro(params: IAgregarLibroParams) {
    try {
      const agregarLibroResponse = await prisma.inventario.create({
        data: {
          cantidad: params.cantidad,
          editorial: params.editorial,
          isbn: params.isbn,
          precio_unitario: params.precio_unitario,
          titulo: params.titulo,
          estado: "activo",
        },
      });
      if (!agregarLibroResponse)
        return {
          error: "Libro no agregado",
          detalle: "Hubo un problema agregando el libro a la base de datos",
        };

      return agregarLibroResponse;
    } catch (error) {
      return error;
    }
  }

  async actualizarLibro(params: IActualizarLibroParams) {
    try {
      const actualizarLibroResponse = await prisma.inventario.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.cantidad && { cantidad: params.cantidad }),
          ...(params.editorial && { editorial: params.editorial }),
          ...(params.precio_unitario && {
            precio_unitario: params.precio_unitario,
          }),
          ...(params.titulo && { titulo: params.titulo }),
        },
      });

      if (!actualizarLibroResponse)
        return {
          error: "Libro no actualizado",
          detalle: "Hubo un problema actualizando el libro",
        };

      return actualizarLibroResponse;
    } catch (error) {
      return error;
    }
  }

  async listarLibros() {
    try {
      const listarLibrosResponse = await prisma.inventario.findMany({
        select: {
          id: true,
          isbn: true,
          titulo: true,
          editorial: true,
          cantidad: true,
          precio_unitario: true,
        },
      });

      if (!listarLibrosResponse)
        return {
          error: "No existen libros ",
          detalle: "No hay libros en el inventario",
        };

      return listarLibrosResponse;
    } catch (error) {
      return error;
    }
  }

  async obtenerLibro(id: string) {
    try {
      const obtenerLibroResponse = await prisma.inventario.findFirst({
        where: {
          id: id,
        },
        select: {
          isbn: true,
          precio_unitario: true,
          titulo: true,
          editorial: true,
          cantidad: true,
        },
      });

      if (!obtenerLibroResponse)
        return {
          error: "No se encontro el libro",
          detalle: "El ISBN no coincide con ningun libro",
        };

      return obtenerLibroResponse;
    } catch (error) {
      return error;
    }
  }

  async eliminarLibro(id: string) {
    try {
      const eliminarLibroResponse = await prisma.inventario.delete({
        where: {
          id: id,
        },
      });
      if (!eliminarLibroResponse)
        return {
          error: "Error eliminando libro",
          detalle: "Ocurrio un error al intentar borrar el libro",
        };

      return eliminarLibroResponse;
    } catch (error) {
      return error;
    }
  }
}
