import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('DB_DATABASE_NAME'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        autoLoadEntities: true,
        logging: true,
        // synchronize: false,
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
        // migrations: ['migrations/**'],
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        // migrations: ['dist/database/migrations/*.{ts,js}'],
        // migrations: ['dist/db-migrations/*.js'],
        // migrationsRun: true,
        // migrations: ['/../migrations/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    console.log('Database connection successful');
  }
}
