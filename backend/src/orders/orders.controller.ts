import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() body: { items: { menuItemId: number; quantity: number }[] }
  ) {
    return this.orderService.createOrder(body.items);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
