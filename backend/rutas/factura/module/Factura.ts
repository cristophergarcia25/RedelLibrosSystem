import { PrismaClient } from "@prisma/client";
import { ICrearFacturaParams } from "./types";

const prisma = new PrismaClient();

export class Factura {
  async crearFactura(params: ICrearFacturaParams) {
    const date = new Date();

    try {
      const crearFacturaResponse = await prisma.factura.create({
        data: {
          id_institucion: params.id_institucion,
          id_usuario: params.id_usuario,
          num_factura: params.num_factura,
          estado: "P",
          tipo_documento: params.tipo_documento,
          fecha: date.toLocaleString(),
        },
      });
    } catch (error) {}
  }
}
