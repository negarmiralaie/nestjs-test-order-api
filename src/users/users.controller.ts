import { UserService } from './users.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  getUserOrders(@Param('id') id: string): Promise<ApiResponse> {
    return this.userService.getUserOrders(id);
  }
}
