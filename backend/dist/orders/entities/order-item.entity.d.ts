import { Order } from './order.entity';
import { MenuItem } from '../../menu-items/entities/menu_items.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    menuItem: MenuItem;
    quantity: number;
}
