import { getRepository, Repository } from 'typeorm';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { formatPagingResponse } from '@shared/utils';
import ILogRepository from '@modules/log/repositories/ILogRepository';
import ICreateLogDTO from '@modules/log/dtos/ICreateLogDTO';
import Log from '../entities/Log';

export default class LogRepository implements ILogRepository {
  private repository: Repository<Log>;

  constructor() {
    this.repository = getRepository(Log);
  }

  public async create(data: ICreateLogDTO) {
    const log = this.repository.create(data);

    return await this.repository.save(log);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.repository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }
}
