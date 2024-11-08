import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ParseDatePipe } from './parse-date.pipe';
import { OrderService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  // total orders per day
  @Get('total-orders')
  async getTotalOrdersPerDay(@Query('date') date: string): Promise<any> {
    return this.orderService.getTotalOrdersPerDay(date);
  }

  // daily revenue
  @Get('daily-revenue')
  async getDailyRevenue(
    @Query('date', ParseDatePipe) date: Date
  ): Promise<number> {
    return this.orderService.getDailyRevenue(date);
  }
  // average amount
  @Get('average-order-amount')
  async getAverageOrderAmount(
    @Query('date', ParseDatePipe) date: Date
  ): Promise<{ averageOrderAmount: number }> {
    const averageAmount = await this.orderService.getAverageOrderAmountPerDay(
      date
    );
    return { averageOrderAmount: averageAmount };
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateData: Partial<Order>
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
