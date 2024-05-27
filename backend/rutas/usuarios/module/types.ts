export interface ICrearUsuarioParams {
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  contrasena: string;
}

export interface IActualizarUsuarioParams {
  id: string;
  contrasena: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  rol?: string;
}
