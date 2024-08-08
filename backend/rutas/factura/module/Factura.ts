import { PrismaClient } from "@prisma/client";
import { ICrearFacturaParams } from "./types";
import { Result } from "../../../utils/result";
import { ErroresFactura } from "../errors/erroresFactura";

const prisma = new PrismaClient();

export class Factura {
  async crearFactura(params: ICrearFacturaParams) {
    try {
      const articulos = await Promise.all(
        params.articulos.map(async (articulo) => {
          const inventario = await prisma.inventario.findUnique({
            where: {
              id: articulo.id_inventario,
              cantidad: { gte: articulo.cantidad },
            },
          });

          if (!inventario) {
            throw Result.customError(ErroresFactura.LIBROS_NO_ENCONTRADOS);
          }

          const subtotal = articulo.cantidad * inventario.precio_unitario;
          return {
            inventario: { connect: { id: articulo.id_inventario } },
            cantidad: articulo.cantidad,
            precio_unitario: inventario.precio_unitario,
            subtotal,
          };
        })
      );
      if (!articulos)
        return Result.customError(ErroresFactura.LIBROS_NO_ENCONTRADOS);

      const crearFacturaResponse = await prisma.factura.create({
        data: {
          num_factura: params.num_factura,
          tipo_documento: params.tipo_documento,
          institucion: { connect: { id: params.id_institucion } },
          usuario: { connect: { id: params.id_usuario } },
          estado: "P",
          articulos: {
            create: articulos,
          },
        },
      });
      if (!crearFacturaResponse)
        return Result.customError(ErroresFactura.FACTURA_NO_CREADA);

      return Result.success(crearFacturaResponse);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  async listarFacturas() {
    try {
      const listarFacturasResponse = await prisma.factura.findMany({
        select: {
          articulos: {
            select: {
              inventario: {
                select: {
                  titulo: true,
                  precio_unitario: true,
                },
              },
              cantidad: true,
              subtotal: true,
              precio_unitario: true,
            },
          },
          tipo_documento: true,
          estado: true,
          fecha: true,
          institucion: {
            select: {
              nit: true,
              nombre_factura: true,
              porcentaje_descuento: true,
              direccion_factura: true,
            },
          },
          num_factura: true,
        },
      });

      return listarFacturasResponse;
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }
}
