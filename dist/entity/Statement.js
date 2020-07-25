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
var typeorm_1 = require("typeorm");
var Customer_1 = require("./Customer");
var Statement = /** @class */ (function () {
    function Statement() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Statement.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Statement.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Statement.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Customer_1.Customer; }, function (cust) { return cust.statements; }),
        __metadata("design:type", Customer_1.Customer)
    ], Statement.prototype, "customer", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Statement.prototype, "refNumber", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Statement.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            default: 0.00
        }),
        __metadata("design:type", Number)
    ], Statement.prototype, "debit", void 0);
    __decorate([
        typeorm_1.Column({
            default: 0.00
        }),
        __metadata("design:type", Number)
    ], Statement.prototype, "credit", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Statement.prototype, "balance", void 0);
    Statement = __decorate([
        typeorm_1.Entity()
    ], Statement);
    return Statement;
}());
exports.Statement = Statement;
