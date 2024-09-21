import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { ApiResponse } from '../common/interfaces/response.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { RedisService } from '@src/redis/redis.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    private userService: UserService,
    private productsService: ProductsService,
    private readonly redisService: RedisService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<ApiResponse>  {
    try {
      const orderer = await this.userService.findOneById(createOrderDto.ordererId);
      if (orderer.statusCode !== 200) return orderer;

      const product = await this.productsService.findOneById(createOrderDto.productId);
      if (product.statusCode !== 200) return product;

      const order = new Orders(createOrderDto);
      order.price = product.data.product.price;
      order.orderer = orderer.data.user;
      order.product = product.data.product;
      const createdOrder = await this.ordersRepository.save(order);
      ['createdAt', 'updatedAt'].forEach(prop => delete createdOrder[prop]);
      await this.redisService.deleteKeysByPattern('user_orders:*');

      return {
        statusCode: 200,
        message: 'Order created successfully.',
        data: { order: createdOrder },
      }
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Internal Server Error!`,
        data: null,
      };
    }
  }
}
