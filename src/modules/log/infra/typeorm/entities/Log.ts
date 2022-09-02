import { ILogAddress, ILogAverage, LogEnumType } from '@modules/log/interfaces';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('log')
export default class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  content: ILogAddress | ILogAverage;

  @Column({ type: 'enum', enum: LogEnumType })
  type: LogEnumType;

  @CreateDateColumn()
  created_at: Date;
}
