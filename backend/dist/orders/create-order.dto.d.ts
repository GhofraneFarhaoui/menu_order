export declare class CreateOrderDto {
    total_price: number;
    items: {
        menuItemId: number;
        quantity: number;
    }[];
}
