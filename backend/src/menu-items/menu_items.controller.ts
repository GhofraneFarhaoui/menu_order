import { Controller, Get, Param } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';

@Controller('menu_items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.menuItemsService.findByCategory(+categoryId);
  }
}
