import { enumToArray } from '@shared/utils';

export enum LogEnumType {
  address = 'address',
  average = 'average',
}
export const logEnumArray = enumToArray(LogEnumType);
