"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var menu_items_entity_1 = require("./entities/menu_items.entity");
var menu_items_service_1 = require("./menu_items.service");
var menu_items_controller_1 = require("./menu_items.controller");
var MenuItemsModule = /** @class */ (function () {
    function MenuItemsModule() {
    }
    MenuItemsModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([menu_items_entity_1.MenuItem])],
            providers: [menu_items_service_1.MenuItemsService],
            controllers: [menu_items_controller_1.MenuItemsController],
        })
    ], MenuItemsModule);
    return MenuItemsModule;
}());
exports.MenuItemsModule = MenuItemsModule;