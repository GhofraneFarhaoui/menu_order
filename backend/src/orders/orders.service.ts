import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
      created_at: new Date(),
    });

    const savedOrder = await this.orderRepository.save(newOrder);

    for (const item of items) {
      const orderItem = this.orderItemRepository.create({
        order: savedOrder,
        menuItem: { id: item.menuItemId },
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

  //total orders

  async getTotalOrdersPerDay(date: string): Promise<number> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select('COUNT(*)', 'count')
      .where('DATE(order.created_at) = :date', { date })
      .getRawOne();

    return result ? parseInt(result.count, 10) || 0 : 0;
  }
  // total revenue

  async getDailyRevenue(date: Date): Promise<number> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const orders = await this.orderRepository.find({
      where: {
        created_at: Between(startDate, endDate),
      },
    });

    return orders.reduce((sum, order) => sum + Number(order.totalPrice), 0);
  }
  //average amount

  async getAverageOrderAmountPerDay(date: Date): Promise<number> {
    const dateString = date.toISOString().split('T')[0];
    const totalOrders = await this.getTotalOrdersPerDay(dateString);
    const dailyRevenue = await this.getDailyRevenue(date);

    return totalOrders > 0 ? dailyRevenue / totalOrders : 0;
  }
  //popular items
  async getMostPopularItemsLastWeek(): Promise<any> {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const result = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .innerJoin('orderItem.order', 'order')
      .innerJoin('orderItem.menuItem', 'menuItem')
      .select('menuItem.name', 'name')
      .addSelect('menuItem.image_url', 'imageUrl')
      .addSelect('SUM(orderItem.quantity)', 'totalOrdered')
      .where('order.created_at > :lastWeek', { lastWeek })
      .groupBy('menuItem.id')
      .orderBy('SUM(orderItem.quantity)', 'DESC')
      .getRawMany();

    return result;
  }
}
