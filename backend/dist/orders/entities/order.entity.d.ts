import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    totalPrice: number;
    createdAt: Date;
    orderItems: OrderItem[];
}
