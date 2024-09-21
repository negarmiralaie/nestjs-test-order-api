import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
import { CustomPipesModule } from '../common/customPipes/custom-pipes.module';
import { RedisModule } from '../redis/redis.module';
import { Orders } from '@src/orders/entities/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Orders]),
    CustomPipesModule,
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
