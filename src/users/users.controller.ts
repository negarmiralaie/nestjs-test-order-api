import { UserService } from './users.service';
import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@src/common/interfaces/response.interface';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiBody({
    type: CreateUserDto,
    required: true,
    description: 'Register applicant by email',
    schema: {
      example: {
        name: 'John Doe',
        email: 'test@gmail.com',
      },
    },
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id/orders')
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'Page for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'Limit for pagination',
  })
  getUserOrders(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<ApiResponse> {
    return this.userService.getUserOrders(id, page, limit);
  }
}
