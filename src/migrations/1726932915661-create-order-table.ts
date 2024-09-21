import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableForeignKey,
  } from 'typeorm';
  
  export class CreateOrderTable1726932915661 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      // Create 'orders' table
      await queryRunner.createTable(
        new Table({
          name: 'orders',
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
              name: 'price',
              type: 'float',
              isNullable: false,
            },
            {
              name: 'discount',
              type: 'float',
              isNullable: false,
            },
            {
              name: 'amount',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'ordererId',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'productId',
              type: 'uuid',
              isNullable: false,
            },
          ],
        }),
        true,
      );
  
      await queryRunner.createIndex(
        'orders',
        new TableIndex({
          name: 'IDX_ORDERS_ORDERER',
          columnNames: ['ordererId'],
        }),
      );
  
      await queryRunner.createIndex(
        'orders',
        new TableIndex({
          name: 'IDX_ORDERS_PRODUCT',
          columnNames: ['productId'],
        }),
      );
  
      await queryRunner.createIndex(
        'orders',
        new TableIndex({
          name: 'IDX_ORDERS_ORDERER_PRODUCT',
          columnNames: ['ordererId', 'productId'],
        }),
      );
  
      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          columnNames: ['ordererId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
        }),
      );
  
      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          columnNames: ['productId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'CASCADE',
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('orders');
      const foreignKeyOrderer = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('ordererId') !== -1,
      );
      const foreignKeyProduct = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('productId') !== -1,
      );
      await queryRunner.dropForeignKey('orders', foreignKeyOrderer);
      await queryRunner.dropForeignKey('orders', foreignKeyProduct);
  
      await queryRunner.dropIndex('orders', 'IDX_ORDERS_ORDERER');
      await queryRunner.dropIndex('orders', 'IDX_ORDERS_PRODUCT');
      await queryRunner.dropIndex('orders', 'IDX_ORDERS_ORDERER_PRODUCT');
  
      await queryRunner.dropTable('orders');
    }
  }
  