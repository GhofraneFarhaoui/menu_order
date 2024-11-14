import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemsModule } from './menu-items/menu_items.module';
import { CategoriesModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { databaseConfig } from './database.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRoot(databaseConfig),
    CategoriesModule,
    MenuItemsModule,
    OrdersModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
