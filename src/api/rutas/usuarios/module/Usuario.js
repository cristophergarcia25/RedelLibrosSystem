import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Usuario {
  /**
   * The function "crearUsuario" creates a new user with admin role using the provided parameters.
   * @param params - {
   * @returns If the user creation is successful, the function will return the response object
   * containing the newly created user's information. If there is an error during the creation process,
   * the function will return the error message.
   */
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

  /**
   * The function "obtenerUsuario" asynchronously retrieves a user from a database using the provided
   * ID and handles errors appropriately.
   * @param id - The `id` parameter in the `obtenerUsuario` function is used to specify the unique
   * identifier of the user that you want to retrieve from the database. This function uses the `id` to
   * query the database and find the user with the matching identifier.
   * @returns If the `obtenerUsuario` function successfully retrieves a user with the specified `id`,
   * it will return the user object. If there is an error during the process, it will return the error
   * message.
   */
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
