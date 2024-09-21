import { PrismaClient } from "@prisma/client";
import {
  IActualizarLibroParams,
  IAgregarLibroParams,
  ICambioEstado,
  ILibro,
} from "./types";
import { Result } from "../../../utils/result";
import { ErroresInventario } from "../errors/erroresInventario";
import { Usuario } from "../../usuarios/module/Usuario";
import { Historial } from "../../historial/module/Historial";
import { EAccionHistorial, ERecursos, ERoles } from "../../../utils/types";

const prisma = new PrismaClient();
const usuario = new Usuario();
const historial = new Historial();

const rolesPermitidos = [ERoles.ADMIN, ERoles.AUXILIAR_ADMIN];

export class Inventario {
  async agregarLibro(params: IAgregarLibroParams) {
    try {
      const agregarLibroResponse = await prisma.inventario.create({
        data: {
          cantidad: params.cantidad,
          editorial: params.editorial,
          isbn: params.isbn,
          precio_unitario: params.precio_unitario,
          total: params.precio_unitario * params.cantidad,
          total_fob: params.costo_fob * params.cantidad,
          costo_fob: params.costo_fob,
          titulo: params.titulo,
          estado: "activo",
          id_proveedor: params.id_proveedor,
          numero_factura: params.numero_factura,
        },
      });
      if (!agregarLibroResponse)
        return Result.errorOperacion(ErroresInventario.INVENTARIO_NO_AGREGADO);

      await historial.agregarHistorial({
        accion: "Nuevo Libro Ingresado",
        id_usuario: params.id_usuario,
        recurso: {
          recurso: ERecursos.INVENTARIO,
          id_recurso: agregarLibroResponse.id,
        },
      });

      return Result.success(agregarLibroResponse);
    } catch (error) {
      return error;
    }
  }

  async actualizarLibro(
    params: IActualizarLibroParams,
    usuarioModificacion: string
  ) {
    try {
      const actualizarLibroResponse = await prisma.inventario.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.cantidad && { cantidad: params.cantidad }),
          ...(params.editorial && { editorial: params.editorial }),
          ...(params.precio_unitario && {
            precio_unitario: params.precio_unitario,
          }),
          ...(params.costo_fob && {
            costo_fob: params.costo_fob,
          }),
          ...(params.titulo && { titulo: params.titulo }),
          ...(params.id_proveedor && { id_proveedor: params.id_proveedor }),
          ...(params.numero_factura && {
            numero_factura: params.numero_factura,
          }),
        },
      });

      if (!actualizarLibroResponse)
        Result.errorOperacion(ErroresInventario.LIBRO_NO_ACTUALIZADO);
      if (params.precio_unitario || params.cantidad || params.costo_fob)
        return await this.actualizarTotalVenta(actualizarLibroResponse);

      await historial.agregarHistorial({
        accion: "Información de Inventario Actualizada",
        id_usuario: usuarioModificacion,
        recurso: {
          recurso: ERecursos.INVENTARIO,
          id_recurso: params.id,
        },
      });

      return Result.success(actualizarLibroResponse);
    } catch (error) {
      return error;
    }
  }

  async listarLibros() {
    try {
      const listarLibrosResponse = await prisma.inventario.findMany({
        select: {
          id: true,
          isbn: true,
          titulo: true,
          editorial: true,
          cantidad: true,
          precio_unitario: true,
          estado: true,
          costo_fob: true,
          total: true,
          total_fob: true,
        },
      });

      if (!listarLibrosResponse)
        return Result.errorOperacion(
          ErroresInventario.INVENTARIO_NO_ENCONTRADO
        );

      return Result.success(listarLibrosResponse);
    } catch (error) {
      return error;
    }
  }

  async obtenerLibro(id: string) {
    try {
      const obtenerLibroResponse = await prisma.inventario.findFirst({
        where: {
          id: id,
        },
        select: {
          isbn: true,
          precio_unitario: true,
          titulo: true,
          editorial: true,
          cantidad: true,
          estado: true,
          costo_fob: true,
          total: true,
          total_fob: true,
        },
      });

      if (!obtenerLibroResponse)
        return Result.errorOperacion(ErroresInventario.LIBRO_NO_ENCONTRADO);

      return Result.success(obtenerLibroResponse);
    } catch (error) {
      return error;
    }
  }

  async desactivarLibro(params: ICambioEstado) {
    try {
      const usuarioActivo = await usuario.obtenerUsuario(params.id_usuario);
      if (usuarioActivo.error || !usuarioActivo.data)
        throw usuarioActivo.detalle;

      if (!rolesPermitidos.includes(usuarioActivo.data.rol))
        return Result.errorOperacion(ErroresInventario.ACCESO_DENEGADO);
      const desactivarLibroResponse = await prisma.inventario.update({
        where: {
          id: params.id,
        },
        data: {
          estado: "desactivado",
          razon: params.razon,
        },
      });
      if (!desactivarLibroResponse)
        return Result.errorOperacion(ErroresInventario.INVENTARIO_ERROR_ESTADO);

      return Result.success(desactivarLibroResponse);
    } catch (error) {
      return error;
    }
  }
  async activarLibro(params: ICambioEstado) {
    try {
      const usuarioActivo = await usuario.obtenerUsuario(params.id_usuario);
      if (usuarioActivo.error || !usuarioActivo.data)
        throw usuarioActivo.detalle;

      if (!rolesPermitidos.includes(usuarioActivo.data.rol))
        return Result.errorOperacion(ErroresInventario.ACCESO_DENEGADO);
      const activarLibroResponse = await prisma.inventario.update({
        where: {
          id: params.id,
        },
        data: {
          estado: "activado",
          razon: params.razon,
        },
      });
      if (!activarLibroResponse)
        return Result.errorOperacion(ErroresInventario.INVENTARIO_ERROR_ESTADO);

      return Result.success(activarLibroResponse);
    } catch (error) {
      return error;
    }
  }

  async eliminarLibro(id: string) {
    try {
      const eliminarLibroResponse = await prisma.inventario.delete({
        where: {
          id: id,
        },
      });
      if (!eliminarLibroResponse)
        return Result.errorOperacion(ErroresInventario.LIBRO_NO_ELIMINADO);

      return Result.success(eliminarLibroResponse);
    } catch (error) {
      return error;
    }
  }

  private async actualizarTotalVenta(params: ILibro) {
    try {
      const actualizarTotalResponse = await prisma.inventario.update({
        where: {
          id: params.id,
        },
        data: {
          total: params.precio_unitario * params.cantidad,
          total_fob: params.costo_fob * params.cantidad,
        },
      });
      if (!actualizarTotalResponse)
        return {
          success: false,
          error: "Error al actualizar el total",
          detalle: "Hubo un error al actualizar el valor total del libro",
        };

      return actualizarTotalResponse;
    } catch (error) {
      return error;
    }
  }
}
