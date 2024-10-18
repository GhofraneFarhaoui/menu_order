"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_items_module_1 = require("./menu-items/menu_items.module");
const category_module_1 = require("./category/category.module");
const menu_items_entity_1 = require("./menu-items/entities/menu_items.entity");
const category_entity_1 = require("./category/entities/category.entity");
const orders_module_1 = require("./orders/orders.module");
const order_entity_1 = require("./orders/entities/order.entity");
const user_entity_1 = require("./user/entities/user.entity");
const order_item_entity_1 = require("./orders/entities/order-item.entity");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'ghof123',
                database: 'menu_order_app',
                entities: [menu_items_entity_1.MenuItem, category_entity_1.Category, order_entity_1.Order, order_item_entity_1.OrderItem, user_entity_1.User],
                synchronize: true,
            }),
            category_module_1.CategoriesModule,
            menu_items_module_1.MenuItemsModule,
            orders_module_1.OrdersModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
