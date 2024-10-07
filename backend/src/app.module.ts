import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemsModule } from './menu-items/menu_items.module';
import { CategoriesModule } from './category/category.module';
import { MenuItem } from './menu-items/entities/menu_items.entity';
import { Category } from './category/entities/category.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'ghof123',
      database: 'menu_order_app',
      entities: [MenuItem, Category, Order, OrderItem],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    }),
    CategoriesModule,
    MenuItemsModule,
    OrdersModule,
  ],
})
export class AppModule {}
