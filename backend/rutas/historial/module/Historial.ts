import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { IHistorialParams } from "./types";
import { ErroresHistorial } from "../errors/erroresHistorial";
import { ERoles } from "../../../utils/types";
import { ErroresGenericos } from "../../../src/errores";

const prisma = new PrismaClient();

const rolesPermitidos = [ERoles.ADMIN, ERoles.AUXILIAR_ADMIN];

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

  async listarHistorial(rol: ERoles) {
    try {
      if (!rolesPermitidos.includes(rol))
        return Result.errorOperacion(ErroresGenericos.ACCESO_DENEGADO);

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
