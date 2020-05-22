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
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["processing"] = 0] = "processing";
    OrderStatus[OrderStatus["pending payment"] = 1] = "pending payment";
    OrderStatus[OrderStatus["completed"] = 2] = "completed";
    OrderStatus[OrderStatus["on hold"] = 3] = "on hold";
    OrderStatus[OrderStatus["cancelled"] = 4] = "cancelled";
    OrderStatus[OrderStatus["refunded"] = 5] = "refunded"; // order has been cancelled and refunded by the admin
})(OrderStatus || (OrderStatus = {}));
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Order.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column('float'),
        __metadata("design:type", Number)
    ], Order.prototype, "amount", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], Order.prototype, "status", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Product_1.Product; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Order.prototype, "products", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Customer_1.Customer; }, function (cust) { return cust.orders; }),
        __metadata("design:type", Customer_1.Customer)
    ], Order.prototype, "customer", void 0);
    Order = __decorate([
        typeorm_1.Entity()
    ], Order);
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=Order.js.map