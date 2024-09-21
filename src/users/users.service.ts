import { Users } from './entities/users.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@src/common/interfaces/response.interface';
import { Orders } from '@src/orders/entities/orders.entity';
import { RedisService } from '@src/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    private readonly redisService: RedisService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ApiResponse>  {
    try {
      const foundUser = await this.findOneByEmail(createUserDto.email);
      if (foundUser.statusCode === 200) {
        return {
          statusCode: 409,
          message: 'A user with this email already exists!',
          data: null,
        }
      }

      const createdUser = await this.userRepository.save(createUserDto);

      ['createdAt', 'updatedAt'].forEach(prop => delete createdUser[prop]);
      return {
        statusCode: 200,
        message: 'User created successfully.',
        data: { user: createdUser },
      }
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Internal Server Error!`,
        data: null,
      };
    }
  }

  async findOneByEmail(email: string): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return {
          statusCode: 404,
          message: `No user with this email is found.`,
          data: null,
        };
      }
      return {
        statusCode: 200,
        message: `Found user successfully.`,
        data: { user },
      };
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Internal Server Error!`,
        data: null,
      };
    }
  }

  async findOneById(id: string): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return {
          statusCode: 404,
          message: `No user with this id is found.`,
          data: null,
        };
      }
      return {
        statusCode: 200,
        message: `Found user successfully.`,
        data: { user },
      };
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Internal Server Error!`,
        data: null,
      };
    }
  }

  async getUserOrders(
    id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse> {
    try {
      const cacheKey = `user_orders:${page}:${limit}:${id}`;
      const cachedData = await this.redisService.get(cacheKey);
      let meta, data;
      if (!cachedData) {
        const foundUser = await this.findOneById(id);
        if (foundUser.statusCode !== 200) return foundUser;
  
        const [orders, total] = await this.ordersRepository.findAndCount({
          where: { orderer: { id: foundUser.data.user.id } },
          order: { createdAt: 'DESC' },
          skip: (page - 1) * limit,
          take: limit,
          relations: ['product', 'orderer'],
        });
  
        const totalPages = Math.ceil(total / limit);
        meta = {
          totalItems: total,
          itemsPerPage: limit,
          totalPages,
        };
        data = orders;
        const dataToCache = {
          data,
          meta: meta,
        };
        await this.redisService.set(
          cacheKey,
          JSON.stringify(dataToCache),
          60 * 60,
        );
      } else {
        const parsedData = JSON.parse(cachedData as any);
        meta = parsedData.meta;
        data = parsedData.data;
      }
      return {
        statusCode: 200,
        message: `Found orders of user successfully.`,
        data: {
          data,
          meta
        }
      };
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Internal Server Error!`,
        data: null,
      };
    }
  }
}
