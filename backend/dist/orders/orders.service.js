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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    createOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { total_price, items } = createOrderDto;
            const newOrder = this.orderRepository.create({
                totalPrice: total_price,
                created_at: new Date(),
            });
            const savedOrder = yield this.orderRepository.save(newOrder);
            for (const item of items) {
                const orderItem = this.orderItemRepository.create({
                    order: savedOrder,
                    menuItem: { id: item.menuItemId },
                    quantity: item.quantity,
                });
                yield this.orderItemRepository.save(orderItem);
            }
            return savedOrder;
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.find({ relations: ['orderItems'] });
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOne({
                where: { id },
                relations: ['orderItems'],
            });
            if (!order) {
                throw new Error(`Order with ID ${id} not found`);
            }
            return order;
        });
    }
    updateOrder(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderRepository.update(id, updateData);
            return this.getOrderById(id);
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderRepository.delete(id);
        });
    }
    //total orders
    getTotalOrdersPerDay(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.orderRepository
                .createQueryBuilder('order')
                .select('COUNT(*)', 'count')
                .where('DATE(order.created_at) = :date', { date })
                .getRawOne();
            return result ? parseInt(result.count, 10) || 0 : 0;
        });
    }
    // total revenue
    getDailyRevenue(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            const orders = yield this.orderRepository.find({
                where: {
                    created_at: (0, typeorm_2.Between)(startDate, endDate),
                },
            });
            return orders.reduce((sum, order) => sum + Number(order.totalPrice), 0);
        });
    }
    //average amount
    getAverageOrderAmountPerDay(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateString = date.toISOString().split('T')[0];
            const totalOrders = yield this.getTotalOrdersPerDay(dateString);
            const dailyRevenue = yield this.getDailyRevenue(date);
            return totalOrders > 0 ? dailyRevenue / totalOrders : 0;
        });
    }
    //popular items
    getMostPopularItemsLastWeek() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            const result = yield this.orderItemRepository
                .createQueryBuilder('orderItem')
                .innerJoin('orderItem.order', 'order')
                .innerJoin('orderItem.menuItem', 'menuItem')
                .select('menuItem.name', 'name')
                .addSelect('menuItem.image_url', 'imageUrl')
                .addSelect('SUM(orderItem.quantity)', 'totalOrdered')
                .where('order.created_at > :lastWeek', { lastWeek })
                .groupBy('menuItem.id')
                .orderBy('SUM(orderItem.quantity)', 'DESC')
                .getRawMany();
            return result;
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
