import { PrismaClient } from "@prisma/client";
import {
  IActualizarInstitucionParams,
  IAgregarInstitucionParams,
} from "./types";

const prisma = new PrismaClient();

export class Institucion {
  async agregarInstitucion(params: IAgregarInstitucionParams) {
    try {
      const agregarInstitucionResponse = await prisma.institucion.create({
        data: {
          contacto_principal: params.contacto_principal,
          direccion: params.direccion,
          nombre: params.nombre,
          tel_contacto_principal: params.tel_contacto_principal,
          contacto_secundario: params.contacto_secundario,
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

  async actualizarInstitucion(params: IActualizarInstitucionParams) {
    try {
      const actualizarInstitucionResponse = await prisma.institucion.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.nombre && { nombre: params.nombre }),
          ...(params.contacto_principal && {
            contacto_principal: params.contacto_principal,
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
          ...(params.tel_contacto_secundario && {
            tel_contacto_secundario: params.tel_contacto_secundario,
          }),
          ...(params.direccion && { direccion: params.direccion }),
        },
      });

      if (!actualizarInstitucionResponse)
        return {
          error: "Institucion no actualizada",
          detalle: "Hubo un error durante la actualizacion de la institucion",
        };

      return actualizarInstitucionResponse;
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

  async borrarInstitucion(id: string) {
    try {
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
