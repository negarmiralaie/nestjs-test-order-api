import { AbstractEntity } from '../../database/abstract.entity';
import { Orders } from '../../orders/entities/orders.entity';
import { Entity, Column, OneToMany, Index } from 'typeorm';

@Entity()
@Index(['name'], { unique: true })
export class Products extends AbstractEntity<Products> {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index()
  name: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @OneToMany(() => Orders, orders => orders.product)
  orders: Promise<Orders[]>;
}
