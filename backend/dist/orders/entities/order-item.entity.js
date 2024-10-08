"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
var typeorm_1 = require("typeorm");
var order_entity_1 = require("./order.entity");
var menu_items_entity_1 = require("../../menu-items/entities/menu_items.entity");
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_entity_1.Order; }, function (order) { return order.orderItems; }),
        __metadata("design:type", order_entity_1.Order)
    ], OrderItem.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return menu_items_entity_1.MenuItem; }),
        __metadata("design:type", menu_items_entity_1.MenuItem)
    ], OrderItem.prototype, "menuItem", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "quantity", void 0);
    OrderItem = __decorate([
        (0, typeorm_1.Entity)('order_item')
    ], OrderItem);
    return OrderItem;
}());
exports.OrderItem = OrderItem;
