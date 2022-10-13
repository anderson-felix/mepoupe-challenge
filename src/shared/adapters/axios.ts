import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { red, bgXterm, xterm, bold, italic, white, } from 'cli-color'

interface ILogData {
  reqDate?: Date;
  resDate?: Date;
  baseUrl?: string;
  method?: string;
  resHeaders?: string;
  reqHeaders?: string;
  status?: number;
  statusText?: string;
  data?: Record<string, any>;
  errorMesssage?: string;
  errorCode?: string;
}

export class AxiosAdapter {
  public provider: AxiosInstance;
  private logParams: ILogData;

  constructor(baseURL: string) {
    this.provider = axios.create({ baseURL });
    this.addInterceptors()
  }

  private addInterceptors(): void {
    if (!this.provider) return;

    this.provider.interceptors.request.use(this.formatRequest.bind(this), this.logError.bind(this))
    this.provider.interceptors.response.use(this.formatResponse.bind(this), this.logError.bind(this))
  }

  private formatLogs(): void {
    const {
      baseUrl,
      data,
      errorCode,
      errorMesssage,
      method,
      reqDate,
      reqHeaders,
      resDate,
      resHeaders,
      statusText,
      status
    } = this.logParams;

    const [errorBg, errorFg] = [bgXterm(202), xterm(202)];
    const [successBg, successFg] = [bgXterm(10), xterm(10)];

    const isFailed = String(status).startsWith('4') || String(status).startsWith('5');

    const statusInfo = `${status} ${statusText}`;
    const statusCode = isFailed ? errorBg(statusInfo) : successBg(statusInfo);
    const statusLog = `${italic('Axios request called at')} ${white(bold(reqDate?.toLocaleString()))} with status ${statusCode}`;

    const pathInfo = `The ${bold(method?.toLocaleUpperCase())} type request called ${bold(baseUrl)}`;
    const pathLog = isFailed ? errorFg(pathInfo) : successFg(pathInfo);

    const successInfo = `The call was ${bold(successFg('successfully executed'))}, and returned the following data:\n${Object.keys(data || {}).map(k => `${xterm(57)(k)}: ${bold(white(data ? data[k] : ''))}`).join('\n')}`;
    const failedInfo = `The call as ${bold(red('failed'))}. Error details below:\n${errorFg(errorMesssage)} - ${bold(errorFg(errorCode))}`;
    const responseLog = isFailed ? failedInfo : successInfo;

    console.log(`\n${statusLog} \n${pathLog} \n\n${responseLog} \n`);

    this.logParams = {};
  }

  private formatRequest(request: AxiosRequestConfig): AxiosRequestConfig {
    this.logParams = {
      baseUrl: `${request.baseURL}${request.url}`,
      method: request.method,
      reqDate: new Date(),
    }
    return request
  }

  private formatResponse(response: AxiosResponse): AxiosResponse {
    response.data.files
    this.logParams = {
      ...this.logParams,
      resDate: new Date(),
      status: response.status,
      statusText: response.statusText,
      resHeaders: JSON.stringify(response.headers || {}),
      reqHeaders: JSON.stringify(response.config.headers || {}),
      data: response.data
    }

    this.formatLogs()
    return response
  }

  private async logError(error: any): Promise<never> {
    const response = error.response || {};
    const request = response.request || {};
    this.logParams = {
      ...this.logParams,
      reqDate: new Date(),
      status: response.status,
      statusText: response.statusText,
      reqHeaders: JSON.stringify(error.config?.headers || {}),
      resHeaders: JSON.stringify(response.headers || {}),
      baseUrl: `${this.provider.getUri()}${error.config?.url} `,
      method: request.method,
      errorMesssage: error.message,
      errorCode: String(error.code),
      data: response.data
    }

    this.formatLogs()
    return Promise.reject(error)
  }

}