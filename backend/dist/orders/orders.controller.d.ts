import { OrderService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    updateOrder(id: number, updateData: Partial<Order>): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
