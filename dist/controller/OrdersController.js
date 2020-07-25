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
var OrderDetail_1 = require("../entity/OrderDetail");
var http_status_codes_1 = require("http-status-codes");
var Customer_1 = require("../entity/Customer");
var Invoice_1 = require("../entity/Invoice");
var Transaction_1 = require("../entity/Transaction");
var Statement_1 = require("../entity/Statement");
var OrdersController = /** @class */ (function () {
    function OrdersController() {
    }
    OrdersController.prototype.getall = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).find({ relations: ['products', 'customer', 'customer.user'] })];
                    case 1:
                        orders = _a.sent();
                        if (orders === null || orders.length < 1)
                            res.status(http_status_codes_1.NOT_FOUND);
                        res.status(http_status_codes_1.OK).json(orders);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).findOne({
                            where: {
                                id: req.params.id
                            },
                            relations: ['products', 'customer', 'customer.user', 'invoices']
                        })];
                    case 1:
                        order = _a.sent();
                        if (order === null)
                            res.status(http_status_codes_1.NOT_FOUND).end();
                        res.status(http_status_codes_1.OK).json(order);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.getCustomerOrders = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).findOne({ where: {
                                cust_id: req.params.id
                            }, relations: ['user'] })];
                    case 1:
                        customer = _a.sent();
                        if (customer === null)
                            res.status(http_status_codes_1.NOT_FOUND);
                        return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).find({ where: {
                                    customer: customer
                                }, relations: ['products'] })];
                    case 2:
                        orders = _a.sent();
                        if (orders === null || orders.length < 0)
                            res.status(http_status_codes_1.NOT_FOUND).end();
                        res.status(http_status_codes_1.OK).json(orders);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.getCustomerInvoices = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, allInvoices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).findOne({ where: {
                                cust_id: req.params.id
                            } })];
                    case 1:
                        customer = _a.sent();
                        if (customer === null)
                            res.status(http_status_codes_1.NOT_FOUND).end();
                        return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).find({
                                relations: ['order', 'order.customer']
                            })];
                    case 2:
                        allInvoices = _a.sent();
                        res.json(allInvoices.filter(function (x) { return x.order.customer.cust_id === customer.cust_id; }));
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.getOrderInvoices = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).findOne({
                            where: {
                                id: req.params.id
                            }
                        })];
                    case 1:
                        order = _a.sent();
                        res.status(http_status_codes_1.OK).json(order.invoices);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.getInvoices = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var invoices, io;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).find({ relations: ['order', 'order.products', 'order.customer', 'order.customer.user'] })];
                    case 1:
                        invoices = _a.sent();
                        if (invoices === null || invoices.length <= 0)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: 'There are no invoices at the moment' });
                        io = req.io;
                        io.emit("updateInvoices", invoices);
                        res.status(http_status_codes_1.OK).json(invoices);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.getUnpaidInvoices = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var invoices, balaces, totalBalance, io, unclearedInvoices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).find({ relations: ['order', 'order.products', 'order.customer', 'order.customer.user'], where: {
                                status: 0 || 2
                            } })];
                    case 1:
                        invoices = _a.sent();
                        if (invoices.length <= 0)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: http_status_codes_1.NOT_FOUND });
                        balaces = invoices.map(function (i) { return i.balance; });
                        totalBalance = balaces.reduce(function (a, b) { return a + b; }, 0);
                        io = req.io;
                        io.emit('updateUnpaidInvoices', invoices);
                        unclearedInvoices = {
                            'count': invoices.length,
                            'amount': totalBalance,
                            'invoices': invoices
                        };
                        res.status(http_status_codes_1.OK).json(unclearedInvoices);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.mostOrderedProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            function getProducts(orders) {
                var products = [];
                orders.forEach(function (item) {
                    products.push.apply(products, item.products);
                });
                return products;
            }
            var orders, products, mostOrderedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).find({ relations: ['products', 'products.category', 'products.orders',
                                'products.orders.customer', "products.orders.customer.user"] })];
                    case 1:
                        orders = _a.sent();
                        products = getProducts(orders);
                        mostOrderedProduct = products.sort(function (a, b) {
                            return products.filter(function (item) { return item.id === a.id; }).length
                                - products.filter(function (item) { return item.id == b.id; }).length;
                        }).pop();
                        res.status(http_status_codes_1.OK).json(mostOrderedProduct);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.createInvoice = function (order, dateDue) {
        return __awaiter(this, void 0, void 0, function () {
            var inv, month, date, seconds, now, dueDate, createInvoiceAttempt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inv = new Invoice_1.Invoice();
                        inv.order = order;
                        month = new Date().getMonth();
                        date = new Date().getDate();
                        seconds = new Date().getSeconds();
                        inv.number = "INV" + date + month + seconds;
                        now = new Date(Date.now());
                        dueDate = now.setDate(now.getDate() + dateDue);
                        inv.duedate = new Date(dueDate);
                        return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).save(inv)];
                    case 1:
                        createInvoiceAttempt = _a.sent();
                        if (!createInvoiceAttempt)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    OrdersController.prototype.payInvoice = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentObj, paymentRequest, invoice, addPayment, transactionsWithInvoice, payments, totalPayments, balance, updatedInvoice, custStatement, customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paymentObj = req.body // Capture the payment object from the client
                        ;
                        paymentRequest = new Transaction_1.Transaction() // initialize a new transaction
                        ;
                        // Transaction properties here, setting amount and mode of payment
                        if (paymentObj.mode === 'cash') {
                            paymentRequest.refNumber = paymentObj.mode + "20" + paymentObj.number;
                        }
                        else {
                            paymentRequest.refNumber = paymentObj.mode + "- " + paymentObj.transactionCode.toUpperCase();
                        }
                        paymentRequest.amountPaid = paymentObj.amount;
                        paymentRequest.modeOfPayment = paymentObj.mode;
                        return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).findOne({
                                where: {
                                    number: paymentObj.number
                                },
                                relations: ['order', 'order.customer']
                            })
                            // TODO: Implement a situation where the invoice is not found.
                            // DO NOT FORGET !!
                        ];
                    case 1:
                        invoice = _a.sent();
                        // TODO: Implement a situation where the invoice is not found.
                        // DO NOT FORGET !!
                        paymentRequest.invoice = invoice; // associate the transaction with the invoice obtained above
                        return [4 /*yield*/, typeorm_1.getRepository(Transaction_1.Transaction).save(paymentRequest)]; // save the payment transaction and get the saved instance
                    case 2:
                        addPayment = _a.sent() // save the payment transaction and get the saved instance
                        ;
                        return [4 /*yield*/, typeorm_1.getRepository(Transaction_1.Transaction).find({
                                where: {
                                    invoice: invoice
                                }
                            })
                            // get the payments made for the particular invoice
                        ];
                    case 3:
                        transactionsWithInvoice = _a.sent();
                        payments = [];
                        transactionsWithInvoice.forEach(function (invoice) {
                            payments.push(invoice.amountPaid);
                        });
                        totalPayments = payments.reduce(function (a, b) { return a + b; }, 0);
                        balance = invoice.order.amount - totalPayments // get the balance from the invoice.
                        ;
                        invoice.balance = balance; // deduct the amount passed from the invoice balance
                        if (invoice.balance == 0) {
                            invoice.status = 1;
                        }
                        else if (invoice.balance > 0 && invoice.balance < invoice.order.amount) {
                            invoice.status = 2;
                        }
                        else {
                            invoice.status = 0;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).save(invoice)
                            // create a new customer statement and add the properties
                        ]; // Update the invoice at the database
                    case 4:
                        updatedInvoice = _a.sent() // Update the invoice at the database
                        ;
                        custStatement = new Statement_1.Statement();
                        customer = updatedInvoice.order.customer;
                        custStatement.customer = customer;
                        custStatement.refNumber = updatedInvoice.number.toString();
                        custStatement.credit = Number.parseInt(paymentObj.amount);
                        custStatement.description = "Payment - " + addPayment.refNumber;
                        custStatement.balance = updatedInvoice.balance;
                        return [4 /*yield*/, typeorm_1.getRepository(Statement_1.Statement).save(custStatement)]; // save the statement
                    case 5:
                        _a.sent(); // save the statement
                        console.log(new Date().valueOf());
                        res.status(http_status_codes_1.OK).json(addPayment);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Get all transactions made
    OrdersController.prototype.getPayments = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionsRepo, transactionsCount, allTransactions, amount, paymentsTotal, transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionsRepo = typeorm_1.getRepository(Transaction_1.Transaction);
                        return [4 /*yield*/, transactionsRepo.find()];
                    case 1:
                        transactionsCount = (_a.sent()).length;
                        return [4 /*yield*/, transactionsRepo.find()];
                    case 2:
                        allTransactions = _a.sent();
                        amount = allTransactions.map(function (a) { return a.amountPaid; });
                        paymentsTotal = amount.reduce(function (a, b) { return a + b; }, 0);
                        transactions = {
                            'count': transactionsCount,
                            'total': paymentsTotal,
                            'transactions': allTransactions
                        };
                        res.status(http_status_codes_1.OK).json(transactions);
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrdersController;
}());
exports.OrdersController = OrdersController;
