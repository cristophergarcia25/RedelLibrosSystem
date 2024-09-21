import { EAccionHistorial, ERecursos } from "../../../utils/types";

export interface IHistorialParams {
  accion: string;
  id_usuario: string;
  recurso: IRecurso;
}

export interface IRecurso {
  recurso: ERecursos;
  id_recurso: string;
}
