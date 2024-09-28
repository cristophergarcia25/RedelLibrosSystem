import { PrismaClient } from "@prisma/client";
import { ERecursos } from "../../../utils/types";
import { Historial } from "../../historial/module/Historial";
import { IActualizarRetaceoParams, ICrearRetaceoParams } from "./types";

const prisma = new PrismaClient();
const historial = new Historial();

export class Retaceo {
  async crearRetaceo(params: ICrearRetaceoParams) {
    try {
      const date = new Date();
      const crearRetaceoResponse = await prisma.retaceo.create({
        data: {
          id_usuario: params.id_usuario,
          fecha: date.toLocaleDateString(),
          descripcion: params.descripcion,
          fac: params.fac,
          parcial: params.parcial,
          id_proveedor: params.id_proveedor,
          cheque: params.cheque,
          total: params.total,
        },
      });
      if (!crearRetaceoResponse)
        return {
          success: false,
          error: "Retaceo no creado",
          detalle: "Hubo un error al crear el retaceo",
        };

      const historialResponse = await historial.agregarHistorial({
        accion: "Retaceo Creado",
        id_usuario: crearRetaceoResponse.id_usuario,
        recurso: {
          recurso: ERecursos.RETACEO,
          id_recurso: crearRetaceoResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return { success: true, data: crearRetaceoResponse };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async actualizarRetaceo(params: IActualizarRetaceoParams) {
    try {
      const actualizarRetaceoResponse = await prisma.retaceo.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.descripcion && { descripcion: params.descripcion }),
          ...(params.fac && { fac: params.fac }),
          ...(params.id_proveedor && { id_proveedor: params.id_proveedor }),
          ...(params.id_usuario && { descripcion: params.descripcion }),
          ...(params.parcial && { parcial: params.parcial }),
          ...(params.cheque && { cheque: params.cheque }),
          ...(params.total && { total: params.total }),
        },
      });
      if (!actualizarRetaceoResponse)
        return {
          success: false,
          error: "Retaceo no actualizado",
          detalle: "Hubo un error al actualizar el retaceo",
        };

      const historialResponse = await historial.agregarHistorial({
        accion: "Retaceo Actualizado",
        id_usuario: actualizarRetaceoResponse.id_usuario,
        recurso: {
          recurso: ERecursos.RETACEO,
          id_recurso: actualizarRetaceoResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return { success: true, data: actualizarRetaceoResponse };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async borrarRetaceo(id: string) {
    try {
      const borrarRetaceoResponse = await prisma.retaceo.delete({
        where: {
          id: id,
        },
      });

      if (!borrarRetaceoResponse)
        return {
          success: false,
          error: "Retaceo no eliminado",
          detalle: "Hubo un error al eliminar el retaceo",
        };

      const historialResponse = await historial.agregarHistorial({
        accion: "Retaceo Eliminado",
        id_usuario: borrarRetaceoResponse.id_usuario,
        recurso: {
          recurso: ERecursos.RETACEO,
          id_recurso: borrarRetaceoResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return { success: true, data: borrarRetaceoResponse };
    } catch (error) {}
  }

  async listarRetaceos() {
    try {
      const listarRetaceosResponse = await prisma.retaceo.findMany({
        select: {
          descripcion: true,
          fac: true,
          proveedor: true,
          fecha: true,
          id: true,
          parcial: true,
          id_usuario: true,
        },
      });
      if (!listarRetaceosResponse)
        return {
          success: false,
          error: "No se encontraron retaceos",
          detalle: "No existen retaceos por listar",
        };

      return { success: true, data: listarRetaceosResponse };
    } catch (error) {}
  }
}
