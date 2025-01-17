import { MenuItemsService } from './menu_items.service';
import { CreateMenuItemDto } from './create-menu-item.dto';
export declare class MenuItemsController {
    private readonly menuItemsService;
    constructor(menuItemsService: MenuItemsService);
    findAll(): Promise<import("./entities/menu_items.entity").MenuItem[]>;
    findByCategory(categoryId: number): Promise<import("./entities/menu_items.entity").MenuItem[]>;
    create(createMenuItemDto: CreateMenuItemDto): Promise<import("./entities/menu_items.entity").MenuItem>;
    uploadImage(file: Express.Multer.File): Promise<{
        imageUrl: string;
    }>;
    publishAll(): Promise<{
        message: string;
    }>;
}
