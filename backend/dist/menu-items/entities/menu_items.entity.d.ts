import { Category } from '../../category/entities/category.entity';
export declare class MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: Category;
}
