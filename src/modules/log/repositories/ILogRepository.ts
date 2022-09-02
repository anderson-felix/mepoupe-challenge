import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import ICreateLogDTO from '../dtos/ICreateLogDTO';
import Log from '../infra/typeorm/entities/Log';

export default interface ILogRepository {
  create(data: ICreateLogDTO): Promise<Log>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Log>>;
}
