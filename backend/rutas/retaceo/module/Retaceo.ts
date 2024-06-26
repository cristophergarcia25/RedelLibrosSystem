import { PrismaClient } from "@prisma/client";
import { IActualizarRetaceoParams, ICrearRetaceoParams } from "./types";

const prisma = new PrismaClient();

export class Retaceo {
  async crearRetaceo(params: ICrearRetaceoParams) {
    try {
      const date = new Date();
      console.log(date);
      const crearRetaceoResponse = await prisma.retaceo.create({
        data: {
          id_usuario: params.id_usuario,
          fecha: date.toLocaleDateString(),
          descripcion: params.descripcion,
          fac: params.fac,
          parcial: params.parcial,
          id_proveedor: params.id_proveedor,
        },
      });
      if (!crearRetaceoResponse)
        return {
          success: false,
          error: "Retaceo no creado",
          detalle: "Hubo un error al crear el retaceo",
        };

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
        },
      });
      if (!actualizarRetaceoResponse)
        return {
          success: false,
          error: "Retaceo no actualizado",
          detalle: "Hubo un error al actualizar el retaceo",
        };

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
