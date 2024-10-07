import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from '../../menu-items/entities/menu_items.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => MenuItem)
  menuItem: MenuItem;

  @Column()
  quantity: number;
}
