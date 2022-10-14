import { IAddressFullData } from "@modules/address/services/address";
import { Logger } from "@shared/utils/Logger";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IDataLogger, SERVICE_TYPE } from "./interfaces";

export class AxiosAdapter {
  public provider: AxiosInstance;
  private logParams: IDataLogger;
  private logger: Logger;

  constructor(baseURL: string) {
    this.provider = axios.create({ baseURL });
    this.logger = new Logger();

    this.addInterceptors()
  }

  private addInterceptors(): void {
    if (!this.provider) return;

    this.provider.interceptors.request.use(this.formatRequest.bind(this), this.logError.bind(this))
    this.provider.interceptors.response.use(this.formatResponse.bind(this), this.logError.bind(this))
  }

  private formatLogs(): void {
    this.logger.log(this.logParams, { handle: () => ({} as any), objetive: 'Consultar api do VIACEP', type: SERVICE_TYPE.VIA_CEP, });
    this.logParams = {} as IDataLogger;
  }

  private formatRequest(req: AxiosRequestConfig): AxiosRequestConfig {
    this.logParams = {
      ...this.logParams,
      httpMethod: req.method,
      url: `${req.baseURL}${req.url}`,
      request: {
        ...(req.data || {}),
        ...(req.params || {}),
        ...(req.headers || {}),
        params: req.params || {},
        headers: req.headers || {},
        files: req.env || {},
        body: req.data,
      }
    }

    return req
  }

  private formatResponse(response: AxiosResponse<IAddressFullData>): AxiosResponse {
    this.logParams = {
      ...this.logParams,
      date: new Date(),
      success: true,
      response: response.data,
      statusCode: response.status,
      message: response.statusText,
      type: SERVICE_TYPE.VIA_CEP,
    }

    this.formatLogs()
    return response
  }

  private async logError(error: any): Promise<never> {
    const response = error.response || {};
    const request = response.request || {};
    this.logParams = {
      ...this.logParams,
      httpMethod: request.method,
      request: response?.config?.data,
      url: `${this.provider.getUri()}${error.config?.url} `,
      date: new Date(),
      success: false,
      response: `${error.message} ${error.code}`,
      statusCode: response.status,
      message: ``,
      type: SERVICE_TYPE.VIA_CEP,
    }

    this.formatLogs()
    return Promise.reject(error)
  }

}