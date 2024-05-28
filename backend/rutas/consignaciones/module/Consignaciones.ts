import { PrismaClient } from "@prisma/client";
import {
  IAprobarConsignacionParams,
  ICrearConsignacionParams,
  IDenegarConsignacionParams,
} from "./types";

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
            estado: "P",
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

  async aprobarConsignacion(params: IAprobarConsignacionParams) {
    try {
      const usuario = await this.verificarUsuario(params.id_usuario);

      if ((usuario.success = false || !usuario.data))
        return {
          success: false,
          error: usuario.error,
          detalle: usuario.detalle,
        };

      if (usuario.data.rol !== "admin")
        return {
          success: false,
          error: "Operacion denegada",
          detalle:
            "El usuario proveido no tiene los permisos para realizar esta operacion",
        };
      const aprobarConsignacionResponse = await prisma.consignaciones.update({
        where: {
          id: params.id_consignacion,
          estado: "P",
        },
        data: {
          estado: "A",
        },
      });

      if (!aprobarConsignacionResponse)
        return {
          success: false,
          error: "Consignacion no aprobada",
          detalle: "Hubo un error durante la aprobacion de la consignacion",
        };

      return { success: true, data: aprobarConsignacionResponse };
    } catch (error) {}
  }

  async denegarConsignacion(params: IDenegarConsignacionParams) {
    try {
      const usuario = await this.verificarUsuario(params.id_usuario);

      if ((usuario.success = false || !usuario.data))
        return {
          success: false,
          error: usuario.error,
          detalle: usuario.detalle,
        };

      if (usuario.data.rol !== "admin")
        return {
          success: false,
          error: "Operacion denegada",
          detalle:
            "El usuario proveido no tiene los permisos para realizar esta operacion",
        };
      const aprobarConsignacionResponse = await prisma.consignaciones.update({
        where: {
          id: params.id_consignacion,
          estado: "P",
        },
        data: {
          estado: "D",
          detalle: params.detalle,
        },
      });

      if (!aprobarConsignacionResponse)
        return {
          success: false,
          error: "Consignacion no aprobada",
          detalle: "Hubo un error durante la aprobacion de la consignacion",
        };

      return { success: true, data: aprobarConsignacionResponse };
    } catch (error) {}
  }

  async listarConsignaciones() {
    try {
      const listadoConsignaciones = await prisma.consignaciones.findMany({
        select: {
          id: true,
          estado: true,
          fecha: true,
          institucion: {
            select: {
              nombre: true,
              porcentaje_descuento: true,
            },
          },
          inventario: true,
        },
      });
      if (!listadoConsignaciones)
        return {
          success: false,
          error: "No existen consignaciones",
          detalle: "No se encontraron consignaciones actuales",
        };

      return { success: true, data: listadoConsignaciones };
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  private async verificarUsuario(id: string) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: {
          id: id,
        },
      });

      if (!usuario)
        return {
          success: false,
          error: "Usuario no encontrado",
          detalle: "El usuario proveido no fue encontrado",
        };
      return {
        success: true,
        data: usuario,
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
