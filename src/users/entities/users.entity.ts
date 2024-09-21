import { AbstractEntity } from '../../database/abstract.entity';
import { Orders } from '../../orders/entities/orders.entity';
import { Entity, Column, OneToMany, Index } from 'typeorm';

@Entity()
@Index(['email'], { unique: true })
// id is part of AbstractEntity and automatically indexed so we don't need to add an index for it manually
export class Users extends AbstractEntity<Users> {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Index()
  email: string;

  @OneToMany(() => Orders, orders => orders.orderer, { cascade: true })
  orders: Promise<Orders[]>;
}
