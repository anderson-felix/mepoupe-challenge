import { ILogAverage, LogEnumType } from '@modules/log/interfaces';

type FuncType = (type: LogEnumType, content: string | ILogAverage) => string;

export const makeLogDetail: FuncType = (type, content) => {
  if (type === LogEnumType.address) return `Service called: ${content}`;

  const { firstValue, secondValue, result } = content as ILogAverage;

  return `Math operation: (${firstValue} + ${secondValue}) / 2 = ${result}`;
};
