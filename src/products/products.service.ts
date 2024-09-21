import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { ApiResponse } from '@src/common/interfaces/response.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}


  async createProduct(createProductDto: CreateProductDto): Promise<ApiResponse>  {
    try {
      const createdProduct = await this.productsRepository.save(createProductDto);
      ['createdAt', 'updatedAt'].forEach(prop => delete createdProduct[prop]);
      return {
        statusCode: 200,
        message: 'Product created successfully.',
        data: { product: createdProduct },
      }
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
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        return {
          statusCode: 404,
          message: `No product with this id is found.`,
          data: null,
        };
      }
      return {
        statusCode: 200,
        message: `Found product successfully.`,
        data: { product },
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
