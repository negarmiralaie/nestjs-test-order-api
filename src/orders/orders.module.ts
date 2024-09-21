import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { CustomPipesModule } from '../common/customPipes/custom-pipes.module';
import { RedisModule } from '../redis/redis.module';
import { Orders } from './entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    CustomPipesModule,
    RedisModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
