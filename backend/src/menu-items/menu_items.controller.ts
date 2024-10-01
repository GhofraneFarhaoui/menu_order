import { Controller, Get, Param } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';

@Controller('menu-items') // Must match the route you're using in the URL
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  async findAll() {
    return this.menuItemsService.findAll();
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number) {
    return this.menuItemsService.findByCategory(categoryId);
  }
}
