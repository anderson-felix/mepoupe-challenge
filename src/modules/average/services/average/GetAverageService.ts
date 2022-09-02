import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import ILogRepository from '@modules/log/repositories/ILogRepository';
import { LogEnumType } from '@modules/log/interfaces';
import { makeLogDetail } from '@shared/utils';

interface IRequest {
  firstValue: number;
  secondValue: number;
}

@injectable()
export class GetAverageService {
  constructor(
    @inject('LogRepository')
    private logRepository: ILogRepository,
  ) {}

  public async execute({ firstValue, secondValue }: IRequest): Promise<string> {
    if (firstValue === undefined || secondValue === undefined)
      throw new LocaleError('inputRequired');

    const result = this.getAverage({ firstValue, secondValue });

    await this.logRepository.create({
      type: LogEnumType.average,
      content: { firstValue, secondValue, result },
      detail: makeLogDetail(LogEnumType.average, {
        firstValue,
        secondValue,
        result,
      }),
    });

    return result;
  }

  private getAverage({ firstValue, secondValue }: IRequest): string {
    const result = (firstValue + secondValue) / 2;
    return result.toFixed(2);
  }
}
