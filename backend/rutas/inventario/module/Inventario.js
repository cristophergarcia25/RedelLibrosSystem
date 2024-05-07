import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Inventario {
  async agregarLibro(params) {
    try {
      const agregarLibroResponse = await prisma.inventario.create({
        data: {
          cantidad: params.cantidad,
          editorial: params.editorial,
          isbn: params.isbn,
          precio_unitario: params.precio_unitario,
          titulo: params.titulo,
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

  async listarLibros() {
    try {
      const listarLibrosResponse = await prisma.inventario.findMany({
        select: {
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

  async obtenerLibro(id) {
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
}
