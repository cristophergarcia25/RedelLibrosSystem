import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { IHistorialParams } from "./types";

const prisma = new PrismaClient();

export class Historial {
  async agregarHistorial(params: IHistorialParams) {
    try {
      const date = new Date();
      const agregarHistorialResponse =
        await prisma.historial_operaciones.create({
          data: {
            accion: params.accion,
            detalle: params.detalle,
            id_usuario: params.id_usuario,
            fecha: date.toLocaleString(),
            recurso: params.recurso,
          },
        });
      if (!agregarHistorialResponse)
        return Result.errorOperacion(
          "Operacion no agregada",
          "Se produjo un error al tratar de guardar la operacion"
        );

      return Result.success(agregarHistorialResponse);
    } catch (error) {}
  }

  async listarHistorial() {
    try {
      const listarHistorialResponse =
        await prisma.historial_operaciones.findMany({
          select: {
            id: true,
            accion: true,
            detalle: true,
            fecha: true,
            usuario: true,
            recurso: true,
          },
        });

      if (!listarHistorialResponse)
        return Result.errorOperacion(
          "Operaciones no encontradas",
          "No se encontaron operaciones por listar"
        );

      return Result.success(listarHistorialResponse);
    } catch (error) {}
  }
}
