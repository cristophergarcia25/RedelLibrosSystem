import { PrismaClient } from "@prisma/client";
import { ICrearConsignacionParams } from "./types";

const prisma = new PrismaClient();

export class Consignaciones {
  async crearConsignacion(params: ICrearConsignacionParams) {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const verificarCantidad = await this.verificarCantidad(
          params.id_libro,
          params.cantidad
        );
        if (!verificarCantidad)
          throw "La cantidad seleccionada es mayor a la disponible actualmente";

        const consignarLibros = await tx.inventario.update({
          where: {
            id: params.id_libro,
          },
          data: {
            cantidad: {
              decrement: params.cantidad,
            },
          },
        });

        if (!consignarLibros)
          throw "Hubo un error quitando los libros del inventario";

        const crearConsignacion = await tx.consignaciones.create({
          data: {
            cantidad: params.cantidad,
            estado: params.estado,
            id_usuario: params.id_usuario,
            id_institucion: params.id_institucion,
            id_libro: params.id_libro,
          },
        });

        if (!crearConsignacion)
          throw "Error al tratar de crear la consignacion";

        return crearConsignacion;
      });

      if (!transaction) throw "Error al crear la consignacion";

      return {
        success: true,
        data: transaction,
      };
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  private async verificarCantidad(id_libro: string, cantidad: number) {
    try {
      const verificarCantidadResponse = await prisma.inventario.findUnique({
        where: {
          id: id_libro,
          cantidad: {
            gte: cantidad,
          },
        },
      });

      return { success: true, data: verificarCantidadResponse };
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }
}
