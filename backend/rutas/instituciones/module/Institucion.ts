import { PrismaClient } from "@prisma/client";
import {
  IActualizarInstitucionParams,
  IAgregarInstitucionParams,
} from "./types";
import { ERoles } from "../../../utils/types";
import { Result } from "../../../utils/result";
import { ErroresGenericos } from "../../../src/errores";

const prisma = new PrismaClient();

const rolesPermitidos = [ERoles.ADMIN, ERoles.AUXILIAR_ADMIN, ERoles.VENDEDOR];

export class Institucion {
  async agregarInstitucion(params: IAgregarInstitucionParams) {
    try {
      const agregarInstitucionResponse = await prisma.institucion.create({
        data: {
          contacto_principal: params.contacto_principal,
          correo_contacto_principal: params.correo_contacto_principal,
          cargo_contacto_principal: params.cargo_contacto_principal,
          direccion: params.direccion,
          direccion_factura: params.direccion_factura,
          giro: params.giro,
          nit: params.nit,
          nombre_factura: params.nombre_factura,
          registro: params.registro,
          nombre: params.nombre,
          tel_contacto_principal: params.tel_contacto_principal,
          contacto_secundario: params.contacto_secundario,
          cargo_contacto_secundario: params.cargo_contacto_secundario,
          correo_contacto_secundario: params.correo_contacto_secundario,
          tel_contacto_secundario: params.tel_contacto_secundario,
          porcentaje_descuento: params.porcentaje_descuento,
        },
      });
      if (!agregarInstitucionResponse)
        return {
          error: "Institucion no agregada",
          detalle: "Hubo un problema agregando la institucion",
        };

      return agregarInstitucionResponse;
    } catch (error) {
      return error;
    }
  }

  async actualizarInstitucion(
    params: IActualizarInstitucionParams,
    rol: ERoles
  ) {
    try {
      if (!rolesPermitidos.includes(rol))
        return Result.errorOperacion(ErroresGenericos.ACCESO_DENEGADO);

      const actualizarInstitucionResponse = await prisma.institucion.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.nombre && { nombre: params.nombre }),
          ...(params.contacto_principal && {
            contacto_principal: params.contacto_principal,
          }),
          ...(params.cargo_contacto_principal && {
            cargo_contacto_principal: params.cargo_contacto_principal,
          }),
          ...(params.correo_contacto_principal && {
            correo_contacto_principal: params.correo_contacto_principal,
          }),
          ...(params.tel_contacto_principal && {
            tel_contacto_principal: params.tel_contacto_principal,
          }),
          ...(params.porcentaje_descuento && {
            porcentaje_descuento: params.porcentaje_descuento,
          }),
          ...(params.contacto_secundario && {
            contacto_secundario: params.contacto_secundario,
          }),
          ...(params.cargo_contacto_secundario && {
            cargo_contacto_secundario: params.cargo_contacto_secundario,
          }),
          ...(params.correo_contacto_secundario && {
            correo_contacto_secundario: params.correo_contacto_secundario,
          }),
          ...(params.tel_contacto_secundario && {
            tel_contacto_secundario: params.tel_contacto_secundario,
          }),
          ...(params.direccion && { direccion: params.direccion }),
          ...(params.nombre_factura && {
            nombre_factura: params.nombre_factura,
          }),
          ...(params.direccion_factura && {
            direccion_factura: params.direccion_factura,
          }),
          ...(params.registro && { registro: params.registro }),
          ...(params.giro && { giro: params.giro }),
          ...(params.nit && { nit: params.nit }),
        },
      });

      if (!actualizarInstitucionResponse)
        return {
          error: "Institucion no actualizada",
          detalle: "Hubo un error durante la actualizacion de la institucion",
        };

      return Result.success(actualizarInstitucionResponse);
    } catch (error) {
      return error;
    }
  }

  async listarInstituciones() {
    try {
      const listadoInstituciones = await prisma.institucion.findMany({
        select: {
          id: true,
          nombre: true,
          porcentaje_descuento: true,
          contacto_principal: true,
          direccion: true,
          contacto_secundario: true,
          tel_contacto_secundario: true,
          tel_contacto_principal: true,
          cargo_contacto_principal: true,
          cargo_contacto_secundario: true,
          correo_contacto_principal: true,
          correo_contacto_secundario: true,
          nombre_factura: true,
          direccion_factura: true,
          giro: true,
          nit: true,
          registro: true,
        },
      });

      if (!listadoInstituciones)
        return {
          error: "No existen instituciones",
          detalle: "No hay instituciones que listar",
        };

      return listadoInstituciones;
    } catch (error) {
      return error;
    }
  }

  async borrarInstitucion(id: string, rol: ERoles) {
    try {
      if (!rolesPermitidos.includes(rol))
        return Result.errorOperacion(ErroresGenericos.ACCESO_DENEGADO);
      const borrarInstitucionResponse = await prisma.institucion.delete({
        where: { id: id },
      });

      if (borrarInstitucionResponse)
        return {
          error: "Institucion no eliminada",
          detalle: "Hubo un problema al intentar eliminar la institucion",
        };

      return borrarInstitucionResponse;
    } catch (error) {
      return error;
    }
  }
}
