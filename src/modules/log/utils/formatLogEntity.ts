import Log from '../infra/typeorm/entities/Log';

const TIMEZONE = 1000 * 60 * 60 * 3;
export interface IFormattedLog extends Omit<Log, 'created_at'> {
  created_at: string;
}

type FuncType = (log: Log) => IFormattedLog;

export const formatLogEntity: FuncType = log => ({
  ...log,
  created_at: `${log.created_at.toDateString()} - ${new Date(
    log.created_at.getTime() - TIMEZONE,
  ).toLocaleTimeString()}`,
});
