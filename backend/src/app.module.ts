import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemsModule } from './menu-items/menu_items.module';
import { CategoriesModule } from './category/category.module';
import { MenuItem } from './menu-items/entities/menu_items.entity';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'ghof123',
      database: 'menu_order_app',
      entities: [MenuItem, Category],
      synchronize: false,
    }),
    CategoriesModule,
    MenuItemsModule,
  ],
})
export class AppModule {}