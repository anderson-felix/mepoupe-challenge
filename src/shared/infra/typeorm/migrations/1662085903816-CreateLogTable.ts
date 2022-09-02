import { logEnumArray } from '@modules/log/interfaces';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLogTable1662085903816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'log',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'content',
            type: 'json',
          },
          {
            name: 'detail',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: logEnumArray,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('log', true);
  }
}
