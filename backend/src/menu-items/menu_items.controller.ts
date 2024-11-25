import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';
import { CreateMenuItemDto } from './create-menu-item.dto';

@Controller('menu_items')
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

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }
}
