import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu_items.entity';
import { CreateMenuItemDto } from './create-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemsRepository: Repository<MenuItem>
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemsRepository.find({ relations: ['category'] });
  }

  async findByCategory(categoryId: number): Promise<MenuItem[]> {
    return this.menuItemsRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = this.menuItemsRepository.create(createMenuItemDto);
    return this.menuItemsRepository.save(menuItem);
  }
}
