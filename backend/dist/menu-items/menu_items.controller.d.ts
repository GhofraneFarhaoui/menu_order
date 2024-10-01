import { MenuItemsService } from './menu_items.service';
export declare class MenuItemsController {
    private readonly menuItemsService;
    constructor(menuItemsService: MenuItemsService);
    findAll(): Promise<import("./entities/menu_items.entity").MenuItem[]>;
    findByCategory(categoryId: string): Promise<import("./entities/menu_items.entity").MenuItem[]>;
}
