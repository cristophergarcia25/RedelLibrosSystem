export interface IResult<T> {
  error?: string;
  detalle?: string;
  data: T;
  success: boolean;
}
