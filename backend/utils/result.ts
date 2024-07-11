import { IErrorGenerico, IResult } from "./types";

export class Result {
  static success(data: any): IResult<any> {
    if (!data) data = {};
    const response: IResult<any> = {
      data: data,
      success: true,
    };
    return response;
  }

  static errorOperacion(errorObj: IErrorGenerico): IResult<any> {
    const response: IResult<any> = {
      data: {},
      success: false,
      error: errorObj.error,
      detalle: errorObj.detalle,
    };
    return response;
  }

  static customError(error: any) {
    const response: IResult<any> = {
      data: {},
      success: false,
      error: "Error desconocido",
      detalle: error,
    };

    return response;
  }
}
