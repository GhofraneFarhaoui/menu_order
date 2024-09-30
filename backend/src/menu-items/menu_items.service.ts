import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu_items.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemsRepository: Repository<MenuItem>
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemsRepository.find();
  }

  async findByCategory(categoryId: number): Promise<MenuItem[]> {
    return this.menuItemsRepository.find({
      where: { category: { id: categoryId } },
    });
  }
}
