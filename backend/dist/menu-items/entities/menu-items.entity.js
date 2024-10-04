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
exports.MenuItem = void 0;
var typeorm_1 = require("typeorm");
var category_entity_1 = require("../../category/entities/category.entity");
var MenuItem = /** @class */ (function () {
    function MenuItem() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MenuItem.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], MenuItem.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], MenuItem.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal'),
        __metadata("design:type", Number)
    ], MenuItem.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], MenuItem.prototype, "image_url", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return category_entity_1.Category; }, function (category) { return category.menuItems; }),
        __metadata("design:type", category_entity_1.Category)
    ], MenuItem.prototype, "category", void 0);
    MenuItem = __decorate([
        (0, typeorm_1.Entity)()
    ], MenuItem);
    return MenuItem;
}());
exports.MenuItem = MenuItem;