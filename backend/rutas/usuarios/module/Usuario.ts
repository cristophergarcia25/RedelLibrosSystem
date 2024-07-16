import { PrismaClient } from "@prisma/client";
import { IActualizarUsuarioParams, ICrearUsuarioParams } from "./types";
import { Result } from "../../../utils/result";
import { IResult } from "../../../utils/types";

const prisma = new PrismaClient();

export class Usuario {
  /**
   * The function "crearUsuario" creates a new user with admin role using the provided parameters.
   * @param params - {
   * @returns If the user creation is successful, the function will return the response object
   * containing the newly created user's information. If there is an error during the creation process,
   * the function will return the error message.
   */
  async crearUsuario(params: ICrearUsuarioParams, rol: string) {
    try {
      console.log(rol);
      const crearResponse = await prisma.usuario.create({
        data: {
          email: params.email,
          nombre: params.nombre,
          apellido: params.apellido,
          rol: params.rol,
          contrasena: params.contrasena,
        },
      });

      if (!crearResponse) throw "Error al crear un nuevo usuario";

      return crearResponse;
    } catch (error) {
      return error;
    }
  }

  async actualizarUsuario(params: IActualizarUsuarioParams) {
    try {
      const actualizarUsuarioResponse = await prisma.usuario.update({
        where: {
          id: params.id,
        },
        data: {
          ...(params.nombre && { nombre: params.nombre }),
          ...(params.apellido && { apellido: params.apellido }),
          ...(params.email && { email: params.email }),
          ...(params.rol && { rol: params.rol }),
          ...(params.contrasena && { contrasena: params.contrasena }),
        },
      });

      if (!actualizarUsuarioResponse)
        return {
          error: "Usuario no actualizado",
          detalle: "Hubo un problema actualizando el usuario",
        };

      return actualizarUsuarioResponse;
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
  async obtenerUsuario(id: string): Promise<IResult<any>> {
    try {
      const obtenerUsuarioResponse = await prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      if (!obtenerUsuarioResponse) throw "Error al crear un nuevo usuario";

      return Result.success(obtenerUsuarioResponse);
    } catch (error) {
      return Result.customError(error);
    }
  }

  async borrarUsuario(id: string) {
    try {
      const borrarUsuarioResponse = await prisma.usuario.delete({
        where: {
          id: id,
        },
      });

      if (!borrarUsuarioResponse) throw "Error al crear un nuevo usuario";

      return borrarUsuarioResponse;
    } catch (error) {
      return error;
    }
  }
}
