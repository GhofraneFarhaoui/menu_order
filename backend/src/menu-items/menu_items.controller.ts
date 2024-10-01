import { Controller, Get, Param } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number) {
    return this.menuItemsService.findByCategory(categoryId);
  }
}
