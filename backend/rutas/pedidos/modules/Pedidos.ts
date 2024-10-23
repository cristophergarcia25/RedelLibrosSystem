import { PrismaClient } from "@prisma/client";
import { Result } from "../../../utils/result";
import { EAccionHistorial, ERecursos, ERoles } from "../../../utils/types";
import { ErroresCotizacion } from "../../cotizaciones/errors/erroresCotizacion";
import { Historial } from "../../historial/module/Historial";
import { ICrearPedidoCotizacionParams, ICrearPedidoParams } from "./types";
import { ErroresPedido } from "../errors/erroresPedido";

const prisma = new PrismaClient();
const historial = new Historial();

export class Pedidos {
  async crearPedido(params: ICrearPedidoParams) {
    try {
      const librosActivos = await prisma.inventario.findMany({
        where: { estado: "activo" },
        select: { id: true, precio_unitario: true },
      });
      if (!librosActivos)
        return Result.errorOperacion(ErroresCotizacion.LIBROS_NO_ENCONTRADOS);

      const arrayLibrosPedidos = params.detalle_articulos.map((idArticulos) =>
        idArticulos.id_inventario.toString()
      );

      const arrayLibrosActivos = librosActivos.map((idLibros) =>
        idLibros.id.toString()
      );

      const validarLibros = arrayLibrosPedidos.filter(
        (id) => !arrayLibrosActivos.includes(id)
      );

      if (validarLibros.length > 0)
        throw "Uno de los articulos indicados no existe";

      const crearPedidoResponse = await prisma.pedidos.create({
        data: {
          id_usuario_solicita: params.id_usuario_solicita,
          id_institucion: params.id_institucion,
          detalle_articulos: params.detalle_articulos,
          fecha_compra: params.fecha_compra,
          fecha_entrega: params.fecha_entrega,
          orden_compra: params.orden_compra,
          id_proveedor: params.id_proveedor,
          estado: "Por Entregar",
        },
      });
      if (!crearPedidoResponse)
        return Result.errorOperacion(ErroresCotizacion.COTIZACION_NO_CREADA);

      const historialResponse = await historial.agregarHistorial({
        accion: "Pedido Colocado",
        id_usuario: crearPedidoResponse.id_usuario_solicita,
        recurso: {
          recurso: ERecursos.PEDIDO,
          id_recurso: crearPedidoResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return Result.success(crearPedidoResponse);
    } catch (error) {
      return {
        success: false,
        mensaje: "Hubo un error durante la operacion",
        error: error,
      };
    }
  }

  async crearDesdeCotizacion(params: ICrearPedidoCotizacionParams) {
    try {
      const cotizacionInfo = await prisma.cotizaciones.findUnique({
        where: {
          id: params.id_cotizacion,
        },
      });

      if (!cotizacionInfo)
        return Result.errorOperacion(ErroresPedido.COTIZACION_NO_ENCONTRADA);

      const crearPedidoResponse = await prisma.pedidos.create({
        data: {
          estado: "Por Entregar",
          id_institucion: cotizacionInfo.id_institucion,
          id_usuario_solicita: cotizacionInfo.id_usuario_solicita,
          detalle_articulos: cotizacionInfo.detalle_articulos,
          fecha_compra: params.fecha_compra,
          fecha_entrega: params.fecha_entrega,
          orden_compra: params.orden_compra,
          id_proveedor: params.id_proveedor,
        },
      });

      if (!crearPedidoResponse)
        return Result.errorOperacion(ErroresPedido.PEDIDO_NO_CREADO);

      const historialResponse = await historial.agregarHistorial({
        accion: "Pedido creado desde cotización",
        id_usuario: crearPedidoResponse.id_usuario_solicita,
        recurso: {
          recurso: ERecursos.PEDIDO,
          id_recurso: crearPedidoResponse.id,
        },
      });

      if (historialResponse?.error) throw historialResponse.detalle;

      return Result.success(crearPedidoResponse);
    } catch (error) {
      return Result.customError(error);
    }
  }

  async entregarPedido(idPedido: string) {
    const entregarPedidoResponse = await prisma.pedidos.update({
      where: {
        id: idPedido,
      },
      data: {
        estado: "Entregado",
      },
    });
    if (!entregarPedidoResponse)
      return Result.errorOperacion(ErroresCotizacion.COTIZACION_NO_CREADA);

    return Result.success(entregarPedidoResponse);
  }

  async listarPedidos() {
    try {
      const listarCotizacionesResponse = await prisma.pedidos.findMany({
        select: {
          institucion: true,
          fecha_compra: true,
          fecha_entrega: true,
          id: true,
          orden_compra: true,
          estado: true,
          usuario: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
            },
          },
          detalle_articulos: true,
        },
      });
      if (!listarCotizacionesResponse)
        return Result.errorOperacion(
          ErroresCotizacion.COTIZACIONES_NO_ENCONTRADAS
        );

      return Result.success(listarCotizacionesResponse);
    } catch (error) {
      return Result.customError(error);
    }
  }
}
