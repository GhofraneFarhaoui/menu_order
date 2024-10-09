"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var orders_service_1 = require("./orders.service");
var orders_controller_1 = require("./orders.controller");
var order_entity_1 = require("./entities/order.entity");
var order_item_entity_1 = require("./entities/order-item.entity");
var menu_items_entity_1 = require("../menu-items/entities/menu_items.entity");
var menu_items_module_1 = require("../menu-items/menu_items.module");
var OrdersModule = /** @class */ (function () {
    function OrdersModule() {
    }
    OrdersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, order_item_entity_1.OrderItem, menu_items_entity_1.MenuItem]),
                menu_items_module_1.MenuItemsModule,
            ],
            providers: [orders_service_1.OrderService],
            controllers: [orders_controller_1.OrderController],
        })
    ], OrdersModule);
    return OrdersModule;
}());
exports.OrdersModule = OrdersModule;
