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
var Product_1 = require("./Product");
var Customer_1 = require("./Customer");
var Invoice_1 = require("./Invoice");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["processing"] = 0] = "processing";
    OrderStatus[OrderStatus["pending"] = 1] = "pending";
    OrderStatus[OrderStatus["completed"] = 2] = "completed";
    OrderStatus[OrderStatus["cancelled"] = 3] = "cancelled";
})(OrderStatus || (OrderStatus = {}));
var OrderDetail = /** @class */ (function () {
    function OrderDetail() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], OrderDetail.prototype, "orderNumber", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], OrderDetail.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], OrderDetail.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column('float'),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "amount", void 0);
    __decorate([
        typeorm_1.Column('int', {
            default: OrderStatus.processing
        }),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "status", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Customer_1.Customer; }, function (customer) { return customer.orders; }),
        __metadata("design:type", Customer_1.Customer)
    ], OrderDetail.prototype, "customer", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Product_1.Product; }, function (p) { return p.orders; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], OrderDetail.prototype, "products", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Invoice_1.Invoice; }, function (inv) { return inv.order; }),
        __metadata("design:type", Array)
    ], OrderDetail.prototype, "invoices", void 0);
    OrderDetail = __decorate([
        typeorm_1.Entity()
    ], OrderDetail);
    return OrderDetail;
}());
exports.OrderDetail = OrderDetail;
