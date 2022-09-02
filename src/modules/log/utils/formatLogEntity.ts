import Log from '../infra/typeorm/entities/Log';

export interface IFormattedLog extends Omit<Log, 'created_at'> {
  created_at: string;
}

type FuncType = (log: Log) => IFormattedLog;

export const formatLogEntity: FuncType = log => ({
  ...log,
  created_at: `${new Date(log.created_at).toDateString()} - ${new Date(
    log.created_at,
  ).toLocaleTimeString()}`,
});
