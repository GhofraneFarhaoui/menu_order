"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseDatePipe = void 0;
const common_1 = require("@nestjs/common");
let ParseDatePipe = class ParseDatePipe {
    transform(value) {
        const date = this.parseDate(value);
        if (!date || isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Invalid date format. Please provide a valid date.');
        }
        return date;
    }
    parseDate(value) {
        const dateFormats = [
            /^\d{4}-\d{2}-\d{2}$/,
            /^\d{2}\/\d{2}\/\d{4}$/,
            /^\d{4}\/\d{2}\/\d{2}$/,
            /^\d{2}-\d{2}-\d{4}$/,
            /^\d{2}\.\d{2}\.\d{4}$/,
        ];
        for (const format of dateFormats) {
            if (format.test(value)) {
                return this.convertToDate(value);
            }
        }
        return null;
    }
    convertToDate(value) {
        let [year, month, day] = [0, 0, 0];
        if (value.includes('-')) {
            [year, month, day] = value.split('-').map(Number);
            if (year < 1000)
                [day, month, year] = [year, month, day];
        }
        else if (value.includes('/')) {
            const parts = value.split('/');
            if (parts[2].length === 4) {
                [day, month, year] = parts.map(Number);
            }
            else {
                [year, month, day] = parts.map(Number);
            }
        }
        else if (value.includes('.')) {
            [day, month, year] = value.split('.').map(Number);
        }
        return new Date(year, month - 1, day);
    }
};
ParseDatePipe = __decorate([
    (0, common_1.Injectable)()
], ParseDatePipe);
exports.ParseDatePipe = ParseDatePipe;
