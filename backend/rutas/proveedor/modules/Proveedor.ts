import { PrismaClient } from "@prisma/client";
import { IActualizarProveedorParams, ICrearProveedorParams } from "./types";

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

  async actualizarProveedor(params: IActualizarProveedorParams) {
    try {
      const actualizarProveedorResponse = await prisma.proveedor.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.direccion && { direccion: params.direccion }),
          ...(params.correo && { correo: params.correo }),
          ...(params.nombre && { nombre: params.nombre }),
          ...(params.telefono && { telefono: params.telefono }),
        },
      });
      if (!actualizarProveedorResponse)
        return {
          success: false,
          error: "Proveedor no actualizado",
          detalle: "Hubo un error al actualizar el proveedor",
        };

      return { success: true, data: actualizarProveedorResponse };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async listarProveedores() {
    try {
      const listarProveedoresResponse = await prisma.proveedor.findMany({
        select: {
          id: true,
          telefono: true,
          correo: true,
          direccion: true,
          nombre: true,
        },
      });
      if (!listarProveedoresResponse)
        return {
          success: false,
          error: "No existen proveedor",
          detalle: "No existen proveedores para listar",
        };

      return { success: true, data: listarProveedoresResponse };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async borrarProveedor(id: string) {
    try {
      const borrarProveedorResponse = await prisma.proveedor.delete({
        where: {
          id: id,
        },
      });
      if (!borrarProveedorResponse)
        return {
          success: false,
          error: "Proveedor no eliminado",
          detalle: "Ocurrio un error al tratar de eliminar el proveedor",
        };

      return { success: true, data: borrarProveedorResponse };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}
