import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ILogAddress, ILogAverage, LogEnumType } from '@modules/log/interfaces';

@Entity('log')
export default class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  content: ILogAddress | ILogAverage;

  @Column()
  detail: string;

  @Column({ type: 'enum', enum: LogEnumType })
  type: LogEnumType;

  @CreateDateColumn()
  created_at: Date;
}
