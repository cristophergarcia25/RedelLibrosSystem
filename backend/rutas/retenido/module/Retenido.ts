import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { ErroresRetenido } from "../errors/erroresRetenido";

const prisma = new PrismaClient();

export class Retenido {
  async getCantidadRetenida(idInventario: string) {
    try {
      const cantidadRetenidaResponse =
        await prisma.inventario_retenido.findMany({
          where: {
            inventarioId: idInventario,
          },
          select: {
            cantidad: true,
          },
        });

      if (!cantidadRetenidaResponse)
        return Result.errorOperacion(ErroresRetenido.INVENTARIO_NO_ENCONTRADO);

      const sumaCantidad = cantidadRetenidaResponse.reduce(
        (acc, item) => acc + item.cantidad,
        0
      );

      return Result.success(sumaCantidad);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }
}
