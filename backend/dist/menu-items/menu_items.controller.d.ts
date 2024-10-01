import { MenuItemsService } from './menu_items.service';
export declare class MenuItemsController {
    private readonly menuItemsService;
    constructor(menuItemsService: MenuItemsService);
    findByCategory(categoryId: number): Promise<import("./entities/menu_items.entity").MenuItem[]>;
}
