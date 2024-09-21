import { IsNotEmpty, IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The id of the orderer',
    example: 'a4433c89-d390-49fc-b911-9571d9ee32f1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ordererId: string;

  @ApiProperty({
    description: 'The id of the product',
    example: '7a381191-6a55-4c74-96e1-51fcad2dea9a',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'The amount of the product',
    example: 10,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'The discount of the product',
    example: 10,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
