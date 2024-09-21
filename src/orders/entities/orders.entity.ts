import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { AbstractEntity } from '../../database/abstract.entity';
import { Products } from '../../products/entities/products.entity';

@Entity()
@Index(['orderer', 'product'])
export class Orders extends AbstractEntity<Orders> {
  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: false })
  discount: number;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(() => Users, orderer => orderer.orders)
  @Index()
  orderer: Promise<Users>;

  @ManyToOne(() => Products, product => product.orders)
  @Index()
  product: Promise<Products>;
}
