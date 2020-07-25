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
var OrderDetail_1 = require("./OrderDetail");
var Transaction_1 = require("./Transaction");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus[InvoiceStatus["notpaid"] = 0] = "notpaid";
    InvoiceStatus[InvoiceStatus["paid"] = 1] = "paid";
    InvoiceStatus[InvoiceStatus["partiallypaid"] = 2] = "partiallypaid";
})(InvoiceStatus || (InvoiceStatus = {}));
var Invoice = /** @class */ (function () {
    function Invoice() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Invoice.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Invoice.prototype, "number", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Invoice.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Invoice.prototype, "duedate", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return OrderDetail_1.OrderDetail; }, function (orderdetail) { return orderdetail; }),
        __metadata("design:type", OrderDetail_1.OrderDetail)
    ], Invoice.prototype, "order", void 0);
    __decorate([
        typeorm_1.Column('int', {
            default: InvoiceStatus.notpaid
        }),
        __metadata("design:type", Number)
    ], Invoice.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Transaction_1.Transaction; }, function (trct) { return trct.invoice; }),
        __metadata("design:type", Array)
    ], Invoice.prototype, "payments", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Invoice.prototype, "balance", void 0);
    Invoice = __decorate([
        typeorm_1.Entity()
    ], Invoice);
    return Invoice;
}());
exports.Invoice = Invoice;
