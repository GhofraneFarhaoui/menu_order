import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { total_price, items } = createOrderDto;

    const newOrder = this.orderRepository.create({
      totalPrice: total_price,
      createdAt: new Date(),
    });

    const savedOrder = await this.orderRepository.save(newOrder);

    for (const item of items) {
      const orderItem = this.orderItemRepository.create({
        order: savedOrder,
        menuItem: { id: item.menuItem },
        quantity: item.quantity,
      });
      await this.orderItemRepository.save(orderItem);
    }

    return savedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['orderItems'] });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateOrder(id: number, updateData: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, updateData);
    return this.getOrderById(id);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
