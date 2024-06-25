import { PrismaClient } from "@prisma/client";
import { ICrearRetaceoParams } from "./types";

const prisma = new PrismaClient();

export class Retaceo {
  async crearRetaceo(params: ICrearRetaceoParams) {
    try {
      const crearRetaceoResponse = await prisma.retaceo.create({
        data: {
          id_usuario: params.id_usuario,
          fecha: Date.now().toLocaleString(),
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
}
