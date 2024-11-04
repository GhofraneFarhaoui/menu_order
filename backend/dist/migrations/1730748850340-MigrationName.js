"use strict";
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
exports.MigrationName1730748850340 = void 0;
class MigrationName1730748850340 {
    constructor() {
        this.name = 'MigrationName1730748850340';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "image_url" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "name" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "description" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "image_url" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "image_url" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "description" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "name" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "image_url" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" DROP NOT NULL`);
        });
    }
}
exports.MigrationName1730748850340 = MigrationName1730748850340;
