declare class OrderItemDto {
    menuItem: number;
    quantity: number;
}
export declare class CreateOrderDto {
    total_price: number;
    items: OrderItemDto[];
}
export {};
