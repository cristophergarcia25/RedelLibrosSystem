import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Security {
  async login(params) {
    try {
      const loginResponse = await prisma.usuario.findFirst({
        where: {
          email: params.email,
          contrasena: params.contrasena,
        },
      });

      if (!loginResponse)
        return {
          error: "Usuario no encontrado",
          detalle: "El usuario o contraseña estan incorrectos",
        };

      return loginResponse;
    } catch (error) {
      return error;
    }
  }
}
