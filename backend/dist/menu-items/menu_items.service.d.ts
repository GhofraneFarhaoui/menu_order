import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu_items.entity';
export declare class MenuItemsService {
    private menuItemsRepository;
    constructor(menuItemsRepository: Repository<MenuItem>);
    findAll(): Promise<MenuItem[]>;
    findByCategory(categoryId: number): Promise<MenuItem[]>;
}
