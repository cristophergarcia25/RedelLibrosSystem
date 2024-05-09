import { PrismaClient } from "@prisma/client";
import { ILoginParams } from "./types";

export class Security {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  /**
   * The function `login` is an asynchronous function that attempts to find a user in the database
   * based on the provided email and password parameters. If the user is not found, it returns an error
   * message.
   * @param params - {
   * @returns If the login is successful, the function will return the response from the database query
   * which contains the user information. If the login is unsuccessful (user not found or incorrect
   * credentials), it will return an error object with the message "Usuario no encontrado" and details
   * "El usuario o contraseña estan incorrectos". If an error occurs during the execution of the
   * function, it will return the error object.
   */
  async login(params: ILoginParams) {
    try {
      const loginResponse = await this.prisma.usuario.findUnique({
        where: {
          email: params.email,
          contrasena: params.contrasena,
        },
        select: {
          id: true,
          rol: true,
          apellido: true,
          nombre: true,
          email: true,
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
