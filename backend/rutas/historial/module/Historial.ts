import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { IHistorialParams } from "./types";
import { ErroresHistorial } from "../errors/erroresHistorial";

const prisma = new PrismaClient();

export class Historial {
  async agregarHistorial(params: IHistorialParams) {
    try {
      const date = new Date();
      const agregarHistorialResponse =
        await prisma.historial_operaciones.create({
          data: {
            accion: params.accion,
            id_usuario: params.id_usuario,
            fecha: date.toLocaleString(),
            recurso: params.recurso,
          },
        });
      if (!agregarHistorialResponse)
        return Result.errorOperacion(ErroresHistorial.HISTORIAL_NO_AGREGADO);

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
            fecha: true,
            usuario: true,
            recurso: true,
          },
        });

      if (!listarHistorialResponse)
        return Result.errorOperacion(ErroresHistorial.HISTORIAL_NO_ENCONTRADO);

      return Result.success(listarHistorialResponse);
    } catch (error) {}
  }
}
