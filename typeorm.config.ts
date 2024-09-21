import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const isCompiled = __filename.endsWith('.js');

const entitiesPath = isCompiled
  ? join(__dirname, 'dist', 'src', '**', '*.entity.js')
  : join(__dirname, 'src', '**', '*.entity.ts');

const migrationsPath = isCompiled
  ? join(__dirname, 'dist', 'src', 'migrations', '**', '*.js')
  : join(__dirname, 'src', 'migrations', '**', '*.ts');

const commonConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsRun: true,
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  autoLoadEntities: true,
};

export const dataSourceOptions: DataSourceOptions = {
  ...commonConfig,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
