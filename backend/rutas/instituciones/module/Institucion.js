import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Institucion {
  async agregarInstitucion(params) {
    try {
      const agregarInstitucionResponse = await prisma.institucion.create({
        data: {
          contacto_principal: params.contacto_principal,
          direccion: params.direccion,
          nombre: params.nombre,
          tel_contacto_principal: params.tel_contacto_principal,
          contacto_secundario: params.contacto_secundario,
          tel_contacto_secundario: params.tel_contacto_secundario,
          porcentaje_descuento: params.porcentaje_factura,
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

  async;
}
