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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemsController = void 0;
var common_1 = require("@nestjs/common");
var menu_items_service_1 = require("./menu-items.service");
var MenuItemsController = /** @class */ (function () {
    function MenuItemsController(menuItemsService) {
        this.menuItemsService = menuItemsService;
    }
    MenuItemsController.prototype.findAll = function () {
        return this.menuItemsService.findAll();
    };
    MenuItemsController.prototype.findByCategory = function (categoryId) {
        return this.menuItemsService.findByCategory(+categoryId);
    };
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MenuItemsController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)('category/:categoryId'),
        __param(0, (0, common_1.Param)('categoryId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], MenuItemsController.prototype, "findByCategory", null);
    MenuItemsController = __decorate([
        (0, common_1.Controller)('menu-items'),
        __metadata("design:paramtypes", [menu_items_service_1.MenuItemsService])
    ], MenuItemsController);
    return MenuItemsController;
}());
exports.MenuItemsController = MenuItemsController;
