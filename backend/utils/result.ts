import { IResult } from "./types";

export class Result {
  static success(data: any): IResult<any> {
    if (!data) data = {};
    const response: IResult<any> = {
      data: data,
      success: true,
    };
    return response;
  }

  static errorOperacion(error: string, detalle: string): IResult<any> {
    const response: IResult<any> = {
      data: {},
      success: false,
      detalle: detalle,
      error: error,
    };
    return response;
  }
}
