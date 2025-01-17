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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const menu_items_service_1 = require("./menu_items.service");
const create_menu_item_dto_1 = require("./create-menu-item.dto");
const uuid_1 = require("uuid");
let MenuItemsController = class MenuItemsController {
    constructor(menuItemsService) {
        this.menuItemsService = menuItemsService;
    }
    // Get all menu items
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.menuItemsService.findAll();
        });
    }
    // Get menu items by category
    findByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.menuItemsService.findByCategory(categoryId);
        });
    }
    // Create a new menu item
    create(createMenuItemDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.menuItemsService.create(createMenuItemDto);
        });
    }
    // Upload an image and return its URL
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageUrl = `http://localhost:3000/static/images/${file.filename}`;
            return { imageUrl };
        });
    }
    // Publish all menu items
    publishAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.menuItemsService.publishAll();
            return { message: 'Menu published successfully' };
        });
    }
};
exports.MenuItemsController = MenuItemsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuItemsController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_item_dto_1.CreateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './static/images',
            filename: (req, file, cb) => {
                const filename = `${(0, uuid_1.v4)()}-${file.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuItemsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Patch)('publish'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemsController.prototype, "publishAll", null);
exports.MenuItemsController = MenuItemsController = __decorate([
    (0, common_1.Controller)('menu_items'),
    __metadata("design:paramtypes", [menu_items_service_1.MenuItemsService])
], MenuItemsController);
