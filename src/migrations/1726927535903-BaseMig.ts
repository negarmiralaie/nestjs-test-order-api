import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableUnique,
} from 'typeorm';

export class BaseMig1726927535903 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'humanReadableId',
              type: 'varchar',
              length: '36',
              isUnique: true,
              isNullable: true,
            },
            {
              name: 'name',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
              isNullable: false,
              isUnique: true,
            },
          ],
        }),
        true,
      );
  
      await queryRunner.createIndex(
        'users',
        new TableIndex({
          name: 'IDX_USERS_EMAIL',
          columnNames: ['email'],
          isUnique: true,
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');
  
      await queryRunner.dropTable('users');
    }
  }
  