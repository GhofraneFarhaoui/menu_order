import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { MenuItem } from '../menu-items/entities/menu_items.entity';
import { MenuItemsModule } from '../menu-items/menu_items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, MenuItem]),
    MenuItemsModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
