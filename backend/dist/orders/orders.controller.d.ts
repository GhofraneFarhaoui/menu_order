import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    createOrder(body: {
        items: {
            menuItemId: number;
            quantity: number;
        }[];
    }): Promise<import("./entities/order.entity").Order>;
    getAllOrders(): Promise<import("./entities/order.entity").Order[]>;
}
