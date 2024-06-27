import { EAccionHistorial, ERecursos } from "../../../utils/types";

export interface IHistorialParams {
  accion: EAccionHistorial;
  id_usuario: string;
  recurso: ERecursos;
  detalle: string;
}
