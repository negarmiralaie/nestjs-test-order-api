import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  // migrations: ['migrations/**'],
  migrations: [__dirname + '/migrations/**/*.js'],
  migrationsRun: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};


  // type: 'postgres',
  // host: process.env.DB_HOST,
  // port: +process.env.DB_PORT,
  // database: process.env.DB_DATABASE_NAME,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // logging: true,
  // migrations: [__dirname + '/migrations/**/*.js'],
  // migrationsRun: true,
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],

// Exporting this object allows for easy import in app.module.ts
