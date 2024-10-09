import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu_items.entity';
import { MenuItemsService } from './menu_items.service';
import { MenuItemsController } from './menu_items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem])],
  providers: [MenuItemsService],
  controllers: [MenuItemsController],
  exports: [MenuItemsService, TypeOrmModule],
})
export class MenuItemsModule {}
