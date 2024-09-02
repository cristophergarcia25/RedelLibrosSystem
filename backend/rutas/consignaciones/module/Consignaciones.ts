import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { EAccionHistorial, ERecursos, ERoles } from "../../../utils/types";
import { ErroresConsignacion } from "../errors/erroresConsignacion";
import { Historial } from "../../historial/module/Historial";
import {
  IActualizarConsignacionParams,
  IAprobarConsignacionParams,
  ICrearConsignacionParams,
  IDenegarConsignacionParams,
} from "./types";

const prisma = new PrismaClient();
const historial = new Historial();

const rolesPermitidos = [ERoles.ADMIN, ERoles.AUXILIAR_ADMIN, ERoles.VENDEDOR];

export class Consignaciones {
  async crearConsignacion(params: ICrearConsignacionParams) {
    try {
      const articulos = await Promise.all(
        params.articulos.map(async (articulo) => {
          const inventario = await prisma.inventario.findUnique({
            where: {
              id: articulo.id_inventario,
              cantidad: { gte: articulo.cantidad },
            },
          });

          if (!inventario) {
            throw Result.customError(ErroresConsignacion.LIBROS_NO_ENCONTRADOS);
          }

          const retirarInventario = await prisma.inventario.update({
            where: {
              id: articulo.id_inventario,
              cantidad: { gte: articulo.cantidad },
            },
            data: {
              cantidad: { decrement: articulo.cantidad },
            },
          });

          if (!retirarInventario) {
            throw Result.customError(ErroresConsignacion.LIBROS_NO_ENCONTRADOS);
          }

          const subtotal = articulo.cantidad * inventario.precio_unitario;
          return {
            inventario: { connect: { id: articulo.id_inventario } },
            cantidad: articulo.cantidad,
            precio_unitario: inventario.precio_unitario,
            subtotal,
          };
        })
      );
      if (!articulos)
        return Result.customError(ErroresConsignacion.LIBROS_NO_ENCONTRADOS);

      const crearConsignacionResponse = await prisma.consignaciones.create({
        data: {
          institucion: { connect: { id: params.id_institucion } },
          fecha_corte: params.fecha_corte,
          estado: "P",
          articulos: {
            create: articulos,
          },
          usuario: { connect: { id: params.id_usuario } },
        },
      });

      if (!crearConsignacionResponse)
        return Result.errorOperacion(
          ErroresConsignacion.CONSIGNACION_NO_CREADA
        );

      await historial.agregarHistorial({
        accion: EAccionHistorial.CREATE,
        id_usuario: params.id_usuario,
        recurso: {
          recurso: ERecursos.CONSIGNACION,
          id_recurso: crearConsignacionResponse.id,
        },
      });

      return Result.success(crearConsignacionResponse);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  async actualizarConsignacion(params: IActualizarConsignacionParams) {
    try {
      const updateConsignacionRespone = await prisma.consignaciones.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.fecha_corte && { fecha_corte: params.fecha_corte }),
          ...(params.id_institucion && {
            id_institucion: params.id_institucion,
          }),
          ...(params.id_usuario && {
            id_usuario: params.id_usuario,
          }),
        },
      });
      if (!updateConsignacionRespone)
        return Result.errorOperacion(
          ErroresConsignacion.CONSIGNACION_NO_ACTUALIZADA
        );

      return Result.success(updateConsignacionRespone);
    } catch (error) {}
  }

  async aprobarConsignacion(params: IAprobarConsignacionParams) {
    try {
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

      const historialResponse = await historial.agregarHistorial({
        accion: EAccionHistorial.APROBADO,
        id_usuario: aprobarConsignacionResponse.id_usuario,
        recurso: {
          recurso: ERecursos.CONSIGNACION,
          id_recurso: aprobarConsignacionResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return { success: true, data: aprobarConsignacionResponse };
    } catch (error) {}
  }

  async denegarConsignacion(params: IDenegarConsignacionParams) {
    try {
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
      const historialResponse = await historial.agregarHistorial({
        accion: EAccionHistorial.DENEGADO,
        id_usuario: aprobarConsignacionResponse.id_usuario,
        recurso: {
          recurso: ERecursos.CONSIGNACION,
          id_recurso: aprobarConsignacionResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;
      return { success: true, data: aprobarConsignacionResponse };
    } catch (error) {}
  }

  async obtenerConsignacion(id: string) {
    try {
      const consignacion = await prisma.consignaciones.findUnique({
        where: {
          id: id,
        },
      });
      if (!consignacion)
        return {
          success: false,
          error: "Consignacion no encontrada",
          detalle: "La consignacion que esta tratando de consultar no existe",
        };

      return { success: true, data: consignacion };
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
          articulos: {
            select: {
              inventario: {
                select: {
                  titulo: true,
                  editorial: true,
                },
              },
              cantidad: true,
            },
          },
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
}
