import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Usuario {
  async crearUsuario(params) {
    try {
      const crearResponse = await prisma.usuario.create({
        data: {
          email: params.email,
          nombre: params.nombre,
          apellido: params.apellido,
          rol: "admin",
          contrasena: params.contrasena,
        },
      });

      if (!crearResponse) throw "Error al crear un nuevo usuario";

      return crearResponse;
    } catch (error) {
      return error;
    }
  }

  async obtenerUsuario(id) {
    try {
      const obtenerUsuarioResponse = await prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      if (!obtenerUsuarioResponse) throw "Error al crear un nuevo usuario";

      return obtenerUsuarioResponse;
    } catch (error) {
      return error;
    }
  }
}
