export interface HttpResponse<T = any> {
  statusCode: number;
  data: T;
  headers?: any
}

export interface HttpRequest<T = any> {
  data?: T;
  params?: T;
}


export interface Controller<T = any> {
  objetive: string
  type: SERVICE_TYPE
  handle: (request: T) => Promise<HttpResponse>;
}

export enum SERVICE_TYPE {
  STRAPI_USER = "Strapi user",
  AWS = "AWS s3 file storange",
  KLAVI = "Klavi",
  TERM = "Term",
  TWILLIO_MAIL = "Twillio mail",
  TWILLIO_SMS = "Twillio SMS",
  VIA_CEP = "Via CEP",
  OTHER = "não especificado",
  STRAPI = "Strapi"
}


export interface IDataLogger {
  statusCode?: number
  type?: SERVICE_TYPE
  message?: string,
  request?: any,
  response?: any
  date: Date
  success: boolean
  httpMethod?: string,
  url?: string
}

export interface ILogger {
  formateMiddleLog(data: IDataLogger): string,
  logging(message: string, success: boolean): void,
  formateControllerLog(controller: Controller, data: IDataLogger): string,
  log(data: IDataLogger, controller?: Controller): void
}