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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Quotation_1 = require("../entity/Quotation");
var http_status_codes_1 = require("http-status-codes");
var Customer_1 = require("../entity/Customer");
var Product_1 = require("../entity/Product");
var QuotationsController = /** @class */ (function () {
    function QuotationsController() {
    }
    QuotationsController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var quotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).find({
                            relations: ['products', 'customer', 'customer.user']
                        })];
                    case 1:
                        quotes = _a.sent();
                        if (quotes.length < 1)
                            res.status(http_status_codes_1.NOT_FOUND).json([]);
                        res.status(http_status_codes_1.OK).json(quotes);
                        return [2 /*return*/];
                }
            });
        });
    };
    QuotationsController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var quotation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).findOne(req.params.id, {
                            relations: ['products', 'customer', 'customer.user']
                        })];
                    case 1:
                        quotation = _a.sent();
                        if (!quotation)
                            res.status(http_status_codes_1.NOT_FOUND).end();
                        res.status(http_status_codes_1.OK).json(quotation);
                        return [2 /*return*/];
                }
            });
        });
    };
    QuotationsController.prototype.createQuote = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var quoteRequest, customer, productIdsArray, productsFromArray, quoteAmount, _i, productIdsArray_1, id, product, quoteObj, day, second, milisecond, addAttempt, io, quotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quoteRequest = req.body;
                        return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).findOne({
                                where: {
                                    cust_id: quoteRequest.customerId
                                }
                            })];
                    case 1:
                        customer = _a.sent();
                        if (!customer)
                            res.status(http_status_codes_1.NOT_MODIFIED).end();
                        productIdsArray = quoteRequest.products;
                        productsFromArray = [];
                        quoteAmount = 0;
                        _i = 0, productIdsArray_1 = productIdsArray;
                        _a.label = 2;
                    case 2:
                        if (!(_i < productIdsArray_1.length)) return [3 /*break*/, 5];
                        id = productIdsArray_1[_i];
                        return [4 /*yield*/, typeorm_1.getRepository(Product_1.Product).findOne(id)];
                    case 3:
                        product = _a.sent();
                        productsFromArray.push(product);
                        quoteAmount += product.price;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (!productsFromArray.length)
                            res.status(http_status_codes_1.NOT_MODIFIED).end();
                        quoteObj = quoteRequest;
                        day = new Date(Date.now()).getDate();
                        second = new Date(Date.now()).getSeconds();
                        milisecond = new Date(Date.now()).getMilliseconds();
                        quoteObj.number = "QT" + milisecond + second + day;
                        quoteObj.products = productsFromArray;
                        quoteObj.customer = customer;
                        quoteObj.amount = quoteAmount;
                        return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).save(quoteObj)];
                    case 6:
                        addAttempt = _a.sent();
                        if (!addAttempt)
                            res.status(http_status_codes_1.NOT_MODIFIED).json({ error: 'an error' +
                                    ' occured' });
                        io = req.io;
                        return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).find({
                                relations: ['products', 'customer', 'customer.user']
                            })];
                    case 7:
                        quotes = _a.sent();
                        io.emit('updateQuotes', quotes);
                        res.status(http_status_codes_1.OK).json(addAttempt);
                        return [2 /*return*/];
                }
            });
        });
    };
    QuotationsController.prototype.removeQuote = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quoteId, quoteToRemove, removeAttempt, io, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        quoteId = req.params.id;
                        return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).findOne(quoteId)];
                    case 1:
                        quoteToRemove = _d.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).remove(quoteToRemove)];
                    case 2:
                        removeAttempt = _d.sent();
                        if (!removeAttempt)
                            res.status(http_status_codes_1.NOT_MODIFIED).end();
                        io = req.io;
                        _b = (_a = io).emit;
                        _c = ['updateQuotes'];
                        return [4 /*yield*/, typeorm_1.getRepository(Quotation_1.Quotation).find({ relations: ['products', 'customer', 'customer.user'] })];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        res.status(http_status_codes_1.OK).json(removeAttempt);
                        return [2 /*return*/];
                }
            });
        });
    };
    return QuotationsController;
}());
exports.QuotationsController = QuotationsController;
