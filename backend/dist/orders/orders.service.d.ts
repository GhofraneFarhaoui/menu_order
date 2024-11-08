import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './create-order.dto';
export declare class OrderService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    updateOrder(id: number, updateData: Partial<Order>): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
    getTotalOrdersPerDay(date: string): Promise<number>;
    getDailyRevenue(date: Date): Promise<number>;
    getAverageOrderAmountPerDay(date: Date): Promise<number>;
}
