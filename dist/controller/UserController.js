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
var User_1 = require("../entity/User");
var Role_1 = require("../entity/Role");
var http_status_codes_1 = require("http-status-codes");
var Customer_1 = require("../entity/Customer");
var OrderDetail_1 = require("../entity/OrderDetail");
var crypto_1 = require("crypto");
var Invoice_1 = require("../entity/Invoice");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userRepository = typeorm_1.getRepository(User_1.User);
    }
    UserController.prototype.all = function (req, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find({ relations: ['role'] })];
                    case 1:
                        users = _a.sent();
                        if (!users)
                            response.status(http_status_codes_1.BAD_REQUEST).json("Errror Code: " + http_status_codes_1.BAD_REQUEST);
                        response.status(http_status_codes_1.OK).json(users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.customers = function (req, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var customers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).find({ relations: ['user', 'orders'] })];
                    case 1:
                        customers = _a.sent();
                        if (customers === null || customers.length <= 0)
                            response.status(http_status_codes_1.NOT_FOUND).end();
                        response.status(http_status_codes_1.OK).json(customers);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.oneCustomer = function (req, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).findOne(req.params.id, { relations: ['user'] })];
                    case 1:
                        customer = _a.sent();
                        if (!customer)
                            response.status(http_status_codes_1.NOT_FOUND).end();
                        response.status(http_status_codes_1.OK).json(customer);
                        return [2 /*return*/];
                }
            });
        });
    };
    // async getCustomerId(req: Request, res: Response) {
    //     let customer = await getRepository(User).findOne({
    //         where: {
    //             emailAddress: req.params.
    //         }
    //     })
    // }
    UserController.prototype.one = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(request.params.id, { relations: ['role'] })];
                    case 1:
                        user = _a.sent();
                        if (user === null)
                            response.status(http_status_codes_1.NOT_FOUND).end();
                        response.status(http_status_codes_1.OK).json({ user: user });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.remove = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var userToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(request.params.id)];
                    case 1:
                        userToRemove = _a.sent();
                        return [4 /*yield*/, this.userRepository.remove(userToRemove)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordhash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ where: {
                                emailAddress: req.body.email
                            } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: "user not found" });
                        passwordhash = crypto_1.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
                        if (passwordhash === user.password) {
                            res.status(http_status_codes_1.OK).json({ success: {
                                    id: user.id, email: user.emailAddress
                                } });
                        }
                        else {
                            res.status(http_status_codes_1.UNAUTHORIZED).json({ error: "Invalid login credentials" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.roles = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Role_1.Role).find()
                        // console.log(roles)
                    ];
                    case 1:
                        roles = _a.sent();
                        // console.log(roles)
                        if (roles == null || roles.length < 1)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: "User Roles not found" });
                        res.status(http_status_codes_1.OK).json({ success: roles });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.registerCustomer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, customer, newCustomer, updatedCustomers, io;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = new User_1.User();
                        user.firstName = req.body.firstname;
                        user.lastName = req.body.lastname;
                        user.salt = crypto_1.randomBytes(16).toString('hex');
                        user.password = crypto_1.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
                        user.emailAddress = req.body.email;
                        _a = user;
                        return [4 /*yield*/, typeorm_1.getRepository(Role_1.Role).findOne({ where: {
                                    name: 'customer'
                                } })];
                    case 1:
                        _a.role = _b.sent();
                        customer = new Customer_1.Customer();
                        customer.address = req.body.address;
                        customer.telephone = req.body.phone;
                        customer.user = user;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).save(customer)];
                    case 3:
                        newCustomer = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).find({
                                relations: ['user', 'orders']
                            })];
                    case 4:
                        updatedCustomers = _b.sent();
                        io = req.io;
                        io.emit('updateCustomers', updatedCustomers);
                        res.status(http_status_codes_1.OK).json(newCustomer);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, customer, order, amount, month, date, seconds, registerAttempt, customerAdd, orderAdd, inv, invmonth, invdate, invseconds, now, dueDate, createInvoiceAttempt, io, invoices, orders, allCustomers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = new User_1.User();
                        user.firstName = req.body.firstname;
                        user.lastName = req.body.lastname;
                        user.salt = crypto_1.randomBytes(16).toString('hex');
                        user.password = crypto_1.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
                        user.emailAddress = req.body.email;
                        _a = user;
                        return [4 /*yield*/, typeorm_1.getRepository(Role_1.Role).findOne({ where: {
                                    name: 'customer'
                                } })];
                    case 1:
                        _a.role = _b.sent();
                        customer = new Customer_1.Customer();
                        customer.address = req.body.address;
                        customer.telephone = req.body.phone;
                        order = new OrderDetail_1.OrderDetail();
                        order.products = req.body.order;
                        amount = 0 //initialize the order amount to 0
                        ;
                        // calculate the total order amount from the array of products selected
                        order.products.forEach(function (element) {
                            amount += element.price;
                        });
                        month = new Date().getMonth();
                        date = new Date().getDate();
                        seconds = new Date().getSeconds();
                        order.orderNumber = "#ON" + date + month + seconds;
                        order.amount = amount;
                        customer.user = user;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
                    case 2:
                        registerAttempt = _b.sent();
                        if (!registerAttempt)
                            res.status(http_status_codes_1.NOT_MODIFIED).json({ error: "An error occured and the operation could not be completed" });
                        customer.user = registerAttempt;
                        return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).save(customer)];
                    case 3:
                        customerAdd = _b.sent();
                        if (!customerAdd)
                            res.status(http_status_codes_1.NOT_MODIFIED).json({ error: "An error occured and the operation could not be completed" });
                        order.customer = customerAdd;
                        return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).save(order)];
                    case 4:
                        orderAdd = _b.sent();
                        if (!orderAdd)
                            res.status(http_status_codes_1.NOT_MODIFIED).json({ error: "An error occured and the operation could not be completed" });
                        inv = new Invoice_1.Invoice();
                        inv.order = order;
                        invmonth = new Date().getMonth();
                        invdate = new Date().getDate();
                        invseconds = new Date().getSeconds();
                        inv.number = "INV" + invdate + invmonth + invseconds;
                        now = new Date(Date.now());
                        dueDate = now.setDate(now.getDate() + 30);
                        inv.duedate = new Date(dueDate);
                        inv.balance = orderAdd.amount;
                        return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).save(inv)];
                    case 5:
                        createInvoiceAttempt = _b.sent();
                        io = req.io;
                        return [4 /*yield*/, typeorm_1.getRepository(Invoice_1.Invoice).find({ relations: ['order'] })];
                    case 6:
                        invoices = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(OrderDetail_1.OrderDetail).find({ relations: ['products', 'customer', 'customer.user'] })];
                    case 7:
                        orders = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Customer_1.Customer).find({ relations: ['user'] })];
                    case 8:
                        allCustomers = _b.sent();
                        io.emit("updateOrders", orders);
                        io.emit("updateCustomers", allCustomers);
                        io.emit("updateInvoices", invoices);
                        res.status(http_status_codes_1.CREATED).json({ customer: customerAdd.user });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
