import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import AWS, { S3 } from 'aws-sdk';

import { IAddressFullData } from "@modules/address/services/address";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { Logger } from "@shared/utils/Logger";
import { IDataLogger, SERVICE_TYPE } from "./interfaces";
import S3StorageProvider from "@shared/container/providers/StorageProvider/implementations/S3StorageProvider";

export interface IHttpProvider {
  baseURL?: string;
  serviceType: SERVICE_TYPE;
  objetive: string;
  config?: AxiosRequestConfig;
}

class AxiosAdapter {
  public provider: AxiosInstance;
  private logParams: IDataLogger;
  private logger: Logger;
  private serviceType: SERVICE_TYPE;
  private objetive: string;

  constructor({ baseURL = '', serviceType, config, objetive }: IHttpProvider) {
    this.provider = axios.create({ baseURL, ...config });
    this.logger = new Logger();
    this.serviceType = serviceType;
    this.objetive = objetive;
    this.addInterceptors()
  }

  private addInterceptors(): void {
    if (!this.provider) return;

    this.provider.interceptors.request.use(this.formatRequest.bind(this), this.logError.bind(this))
    this.provider.interceptors.response.use(this.formatResponse.bind(this), this.logError.bind(this))
  }

  private log(): void {
    this.logger.log(this.logParams, { handle: () => ({} as any), objetive: this.objetive, type: this.serviceType, });
  }

  private formatRequest(req: AxiosRequestConfig): AxiosRequestConfig {
    this.logParams = {
      ...this.logParams,
      httpMethod: req.method?.toLocaleUpperCase(),
      url: `${req.baseURL}${req.url}`,
      request: {
        params: req.params || {},
        headers: req.headers || {},
        files: req.env || {},
        body: req.data,
      },

    }

    return req
  }

  private formatResponse(response: AxiosResponse): AxiosResponse {
    this.logParams = {
      ...this.logParams,
      date: new Date(),
      success: true,
      response: response.data,
      statusCode: response.status,
      message: response.statusText,
      type: this.serviceType,
    }

    this.log()
    return response
  }

  private async logError(error: any): Promise<never> {
    const { status } = error.response;
    const { baseURL, url, method } = error.config;

    this.logParams = {
      ...this.logParams,
      date: new Date(),
      success: false,
      response: `${error.message} ${error.code} on ${method?.toLocaleUpperCase()} ${baseURL}${url}`,
      statusCode: parseInt(`${status}`),
      type: this.serviceType,
    }

    this.log()
    return Promise.reject(error)
  }

  public setObjetive(objetive: string) {
    this.objetive = objetive
  }
  public setServiceType(serviceType: SERVICE_TYPE) {
    this.serviceType = serviceType
  }
}

export type AxiosAdapterInstance = AxiosAdapter & AxiosInstance;

export const proxifyAxiosAdapter = ({ config = {}, ...params }: IHttpProvider): AxiosAdapterInstance => {
  const instance = new AxiosAdapter({ ...params, config })

  return new Proxy(instance, {
    get: (target: any, prop: any) => {
      if (target[prop]) return target[prop];

      return target.provider[prop]

    },
  }) as unknown as AxiosAdapterInstance
}

type Provider = 'aws' | 'axios'

const accessControlList = <const>[
  'private',
  'public-read',
  'public-read-write',
  'authenticated-read',
];

export type AccessControlList = typeof accessControlList[number];
const bucketFiles = <const>['test'];

export type BucketFolders = typeof bucketFiles[number];
export interface AWSParams {
  httpMethod?: string;
  serviceType: SERVICE_TYPE;
  objetive: string;
}

const logger = new Logger();
class AWSAdapter {
  public provider: IStorageProvider;
  private serviceType: SERVICE_TYPE;
  private objetive: string;
  private httpMethod: string;

  constructor({ serviceType, objetive, httpMethod = '' }: AWSParams) {
    this.provider = new S3StorageProvider();
    this.serviceType = serviceType;
    this.objetive = objetive;
    this.httpMethod = httpMethod;
    this.formatLog(S3StorageProvider.prototype)
  }

  private formatLog(prototypeClass: S3StorageProvider) {
    const prototype: any = prototypeClass;
    const props = Reflect.ownKeys(prototypeClass).filter(item => item !== "constructor");
    const objetive = this.objetive;
    const type = this.serviceType;
    const httpMethod = this.httpMethod;

    for (const prop of props) {
      prototype[prop] = new Proxy(prototype[prop], {
        async apply(fn, thisArg, argList) {
          const response: Promise<any> = await fn.apply(thisArg, argList)

          const logData = {
            httpMethod,
            date: new Date(),
            success: true,
            statusCode: 200,
            type,
            response,
            request: { ...argList }
          }

          logger.log(logData, { handle: () => ({} as any), objetive, type, })

          return response
        }

      })
    }
  }

  public setObjetive(objetive: string) {
    this.objetive = objetive
  }
  public setServiceType(serviceType: SERVICE_TYPE) {
    this.serviceType = serviceType
  }
}


export const proxifyAWSAdapter = (params: AWSParams): IStorageProvider => {
  const instance = new AWSAdapter(params)


  return new Proxy(instance, {
    get: (target: any, prop) => {
      if (target[prop]) return target[prop];
      return target.provider[prop]
    },
  })
}

type Class = ((params: IHttpProvider) => AxiosAdapterInstance) | ((params: AWSParams) => IStorageProvider)

type ObjectType<T> =
  T extends "axios" ? AxiosAdapterInstance :
  T extends "aws" ? IStorageProvider :
  never;

type IParams<T> =
  T extends "axios" ? IHttpProvider :
  T extends "aws" ? AWSParams :
  never;

const adapter: Record<Provider, Class> = {
  axios: proxifyAxiosAdapter,
  aws: proxifyAWSAdapter,
}




export function makeHttpProvider<T extends Provider>(type: T, params: IParams<T>): ObjectType<T> {
  return adapter[type](params) as ObjectType<T>
}
