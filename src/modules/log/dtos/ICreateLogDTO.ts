import { ILogAddress, ILogAverage, LogEnumType } from '../interfaces';

export default interface ICreateLogDTO {
  content: ILogAddress | ILogAverage;
  type: LogEnumType;
}
