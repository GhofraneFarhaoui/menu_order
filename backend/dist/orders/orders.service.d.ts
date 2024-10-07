import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    createOrder(items: {
        menuItemId: number;
        quantity: number;
    }[]): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
}
