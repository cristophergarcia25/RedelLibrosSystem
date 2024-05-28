import { PrismaClient, detalle_articulos } from "@prisma/client";
import {
  IAprobarCotizacionParams,
  ICrearCotizacionParams,
  IDenegarCotizacionParams,
  IDetalleArticulos,
} from "./types";

const prisma = new PrismaClient();

export class Cotizacion {
  async crearCotizacion(params: ICrearCotizacionParams) {
    try {
      const crearCotizacionResponse = await prisma.cotizaciones.create({
        data: {
          id_usuario_solicita: params.id_usuario_solicita,
          id_institucion: params.id_institucion,
          detalle_articulos: params.detalle_articulos,
          estado: "P",
        },
      });
      if (!crearCotizacionResponse)
        return {
          sucess: false,
          error: "Cotizacion no creada",
          detalle: "Ocurrio un error al crear la cotizacion",
        };

      return { success: true, data: crearCotizacionResponse };
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
        return {
          sucess: false,
          error: "Cotizacion no aceptada",
          detalle: "Ocurrio un error al aceptar la cotizacion",
        };

      return { success: true, data: aprobarCotizacionResponse };
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
        return {
          sucess: false,
          error: "Cotizacion no aceptada",
          detalle: "Ocurrio un error al aceptar la cotizacion",
        };

      return { success: true, data: denegarCotizacionResponse };
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
          institucion: {
            select: {
              nombre: true,
              porcentaje_descuento: true,
              direccion: true,
              contacto_principal: true,
              tel_contacto_principal: true,
              contacto_secundario: true,
              tel_contacto_secundario: true,
            },
          },
          fecha: true,
          estado: true,
          id_usuario_solicita: true,
          detalle_articulos: true,
        },
      });
      if (!listarCotizacionesResponse)
        return {
          success: false,
          error: "No existen cotizaciones",
          detalle: "Actualmente no existen cotizaciones",
        };

      return { success: true, data: listarCotizacionesResponse };
    } catch (error) {
      return {
        success: false,
        mensaje: "hubo un error durante la operacion",
        error: error,
      };
    }
  }
}
