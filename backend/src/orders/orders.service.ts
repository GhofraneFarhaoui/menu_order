import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  async createOrder(items: { menuItemId: number; quantity: number }[]) {
    try {
      const order = new Order();
      order.items = [];

      for (const item of items) {
        const orderItem = new OrderItem();
        orderItem.menuItem = { id: item.menuItemId } as any;
        orderItem.quantity = item.quantity;
        order.items.push(orderItem);
      }

      return await this.orderRepository.save(order);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getAllOrders() {
    return this.orderRepository.find({ relations: ['items'] });
  }
}
