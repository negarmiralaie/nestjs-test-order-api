import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { CustomPipesModule } from '../common/customPipes/custom-pipes.module';
import { RedisModule } from '../redis/redis.module';
import { Orders } from './entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UserService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Users, Products]),
    CustomPipesModule,
    RedisModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UserService, ProductsService],
  exports: [OrdersService],
})
export class OrdersModule {}
