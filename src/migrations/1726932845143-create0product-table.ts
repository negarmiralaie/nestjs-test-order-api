import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableUnique,
  } from 'typeorm';
  
  export class Create0productTable1726932845143 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'products',
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
              isUnique: true,
            },
            {
              name: 'price',
              type: 'float',
              isNullable: false,
            },
          ],
        }),
        true,
      );
  
      await queryRunner.createIndex(
        'products',
        new TableIndex({
          name: 'IDX_PRODUCTS_NAME',
          columnNames: ['name'],
          isUnique: true,
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex('products', 'IDX_PRODUCTS_NAME');
  
      await queryRunner.dropTable('products');
    }
  }
  