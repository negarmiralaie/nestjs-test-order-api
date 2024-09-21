import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
import { CustomPipesModule } from '../common/customPipes/custom-pipes.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    CustomPipesModule,
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
