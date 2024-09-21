import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { CustomPipesModule } from '../common/customPipes/custom-pipes.module';
import { RedisModule } from '../redis/redis.module';
import { Products } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    CustomPipesModule,
    RedisModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
