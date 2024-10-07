import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    created_at: Date;
    items: OrderItem[];
}
