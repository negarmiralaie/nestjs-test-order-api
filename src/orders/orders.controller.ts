import { OrdersService } from './orders.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@src/common/interfaces/response.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('order')
@Controller('order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiBody({
    type: CreateOrderDto,
    required: true,
    description: 'Create Order',
    schema: {
      example: {
        ordererId: 'a4433c89-d390-49fc-b911-9571d9ee32f1',
        productId: '7a381191-6a55-4c74-96e1-51fcad2dea9a',
        amount: 10,
        discount: 2,
      },
    },
  })
  async createUser(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<ApiResponse> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
