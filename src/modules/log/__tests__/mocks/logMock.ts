import faker from 'faker';

import Log from '@modules/log/infra/typeorm/entities/Log';
import { ILogAddress, ILogAverage, LogEnumType } from '@modules/log/interfaces';
import { makeLogDetail } from '@shared/utils';

interface MockParams {
  content?: ILogAddress | ILogAverage;
  detail?: string;
  type?: LogEnumType;
  created_at?: Date;
}

type MockType = (params?: MockParams) => Log;

const logMock: MockType = params => {
  const createdAt = faker.date.past(1.5);
  const addressContent = {
    address: 'Rua Uberaba',
    city: 'Ribeirão Preto',
    district: 'Jardim Nova Aliança Sul',
    state: 'SP',
    zipcode: 14027090,
  };

  const averageContent = {
    firstValue: 83,
    secondValue: 36,
    result: '59.50',
  };

  const randomNumber = Math.ceil(Math.random() * 10);

  const content = randomNumber > 5 ? addressContent : averageContent;
  const type = randomNumber > 5 ? LogEnumType.address : LogEnumType.average;

  const detail = makeLogDetail(
    type,
    randomNumber > 5 ? 'test suite' : averageContent,
  );

  return {
    id: faker.datatype.uuid(),
    content: params?.content || content,
    detail: params?.detail || detail,
    type: params?.type || type,
    created_at: params?.created_at || createdAt,
  };
};

export default logMock;
