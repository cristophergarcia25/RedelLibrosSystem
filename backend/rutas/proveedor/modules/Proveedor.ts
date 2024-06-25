import { PrismaClient } from "@prisma/client";
import { ICrearProveedorParams } from "./types";

const prisma = new PrismaClient();

export class Proveedor {
  async crearProveedor(params: ICrearProveedorParams) {
    try {
      const crearProveedorResponse = await prisma.proveedor.create({
        data: {
          correo: params.correo,
          direccion: params.direccion,
          nombre: params.nombre,
          telefono: params.telefono,
        },
      });
      if (!crearProveedorResponse)
        return {
          success: false,
          error: "Proveedor no creado",
          detalle: "Hubo un error al crear el proveedor",
        };

      return { success: true, data: crearProveedorResponse };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}
