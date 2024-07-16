import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { EAccionHistorial, ERecursos } from "../../../utils/types";
import { Historial } from "../../historial/module/Historial";
import {
  IAprobarCotizacionParams,
  ICrearCotizacionParams,
  IDenegarCotizacionParams,
} from "./types";
import { ErroresCotizacion } from "../../cotizaciones/errors/erroresCotizacion";
import { Usuario } from "../../usuarios/module/Usuario";

const prisma = new PrismaClient();
const historial = new Historial();
const usuario = new Usuario();

export class Cotizacion {
  async crearCotizacion(params: ICrearCotizacionParams) {
    try {
      const librosActivos = await prisma.inventario.findMany({
        where: { estado: "activo" },
        select: { id: true, precio_unitario: true },
      });
      if (!librosActivos)
        return Result.errorOperacion(ErroresCotizacion.LIBROS_NO_ENCONTRADOS);

      const arrayLibrosCotizados = params.detalle_articulos.map((idArticulos) =>
        idArticulos.id_inventario.toString()
      );

      const arrayLibrosActivos = librosActivos.map((idLibros) =>
        idLibros.id.toString()
      );

      const validarLibros = arrayLibrosCotizados.filter(
        (id) => !arrayLibrosActivos.includes(id)
      );

      if (validarLibros.length > 0)
        throw "Uno de los articulos indicados no existe";

      const crearCotizacionResponse = await prisma.cotizaciones.create({
        data: {
          id_usuario_solicita: params.id_usuario_solicita,
          id_institucion: params.id_institucion,
          detalle_articulos: params.detalle_articulos,
          estado: "P",
        },
      });
      if (!crearCotizacionResponse)
        return Result.errorOperacion(ErroresCotizacion.COTIZACION_NO_CREADA);

      const historialResponse = await historial.agregarHistorial({
        accion: EAccionHistorial.CREATE,
        id_usuario: crearCotizacionResponse.id_usuario_solicita,
        recurso: {
          recurso: ERecursos.COTIZACION,
          id_recurso: crearCotizacionResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return Result.success(crearCotizacionResponse);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  async aprobarCotizacion(params: IAprobarCotizacionParams) {
    try {
      const aprobadoPor = {
        id_usuario: params.id_usuario,
        fecha_aprobacion: Date.now().toLocaleString(),
      };
      const aprobarCotizacionResponse = await prisma.cotizaciones.update({
        where: {
          id: params.id_cotizacion,
          aprobado_por: aprobadoPor,
        },
        data: {
          estado: "A",
        },
      });
      if (!aprobarCotizacionResponse)
        return Result.errorOperacion(ErroresCotizacion.COTIZACION_NO_APROBADA);

      const historialResponse = await historial.agregarHistorial({
        accion: EAccionHistorial.APROBADO,
        id_usuario: params.id_usuario,
        recurso: {
          recurso: ERecursos.COTIZACION,
          id_recurso: aprobarCotizacionResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return Result.success(aprobarCotizacionResponse);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  async denegarCotizacion(params: IDenegarCotizacionParams) {
    try {
      const denegarCotizacionResponse = await prisma.cotizaciones.update({
        where: {
          id: params.id_cotizacion,
        },
        data: {
          estado: "D",
        },
      });
      if (!denegarCotizacionResponse)
        return Result.errorOperacion(ErroresCotizacion.COTIZACION_NO_DENEGADA);

      const historialResponse = await historial.agregarHistorial({
        accion: EAccionHistorial.DENEGADO,
        id_usuario: denegarCotizacionResponse.id_usuario_solicita,
        recurso: {
          recurso: ERecursos.COTIZACION,
          id_recurso: denegarCotizacionResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return Result.success(denegarCotizacionResponse);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  async listarCotizaciones() {
    try {
      const listarCotizacionesResponse = await prisma.cotizaciones.findMany({
        select: {
          institucion: true,
          fecha: true,
          estado: true,
          usuario: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
            },
          },
          detalle_articulos: true,
        },
      });
      if (!listarCotizacionesResponse)
        return Result.errorOperacion(
          ErroresCotizacion.COTIZACIONES_NO_ENCONTRADAS
        );

      return Result.success(listarCotizacionesResponse);
    } catch (error) {
      return Result.customError(error);
    }
  }
}
