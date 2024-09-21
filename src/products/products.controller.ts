import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@src/common/interfaces/response.interface';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('product')
@Controller('product')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiBody({
    type: CreateProductDto,
    required: true,
    description: 'Register applicant by email',
    schema: {
      example: {
        ordererId: 'John Doe',
        productId: 'test@gmail.com',
        amount: 10,
        discount: 2,
      },
    },
  })
  async createUser(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ApiResponse> {
    return this.productsService.createProduct(createProductDto);
  }
}
