import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    totalPrice: number;
    created_at: Date;
    orderItems: OrderItem[];
}
