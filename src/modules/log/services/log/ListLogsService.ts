import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import ILogRepository from '@modules/log/repositories/ILogRepository';
import { LogEnumType } from '@modules/log/interfaces';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import Log from '@modules/log/infra/typeorm/entities/Log';
import { IPagingResponse } from '@shared/utils';
import {
  formatLogEntity,
  IFormattedLog,
} from '@modules/log/utils/formatLogEntity';

interface IRequest {
  firstValue: number;
  secondValue: number;
}

@injectable()
export class ListLogsService {
  constructor(
    @inject('LogRepository')
    private logRepository: ILogRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<IFormattedLog>> {
    const logs = await this.logRepository.find(paging);

    return {
      ...logs,
      results: logs.results.map(formatLogEntity),
    };
  }
}
