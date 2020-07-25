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
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var Role_1 = require("../entity/Role");
var http_status_codes_1 = require("http-status-codes");
var router = express_1.Router();
router.get('/', UserController_1.UserController.prototype.all);
router.get('/:id', UserController_1.UserController.prototype.one);
// Used to create customers from the CRM administrative end
router.post('/customer/create', UserController_1.UserController.prototype.registerCustomer);
// This is similar to create only that it is used during the creation of a
// customer from the e-commerce self guided registration
router.post('/customer/register', UserController_1.UserController.prototype.register);
router.get('/customers/all', UserController_1.UserController.prototype.customers);
router.get('/customer/:id', UserController_1.UserController.prototype.oneCustomer);
router.post('/login', UserController_1.UserController.prototype.login);
router.get('/userroles/', UserController_1.UserController.prototype.roles);
router.post('/addusertorole', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, roleid, user, role, updateUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.body.userid;
                roleid = req.body.roleid;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(userid)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Role_1.Role).findOne(roleid)];
            case 2:
                role = _a.sent();
                if (!(user != null && role != null)) return [3 /*break*/, 4];
                user.role = role;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 3:
                updateUser = _a.sent();
                if (updateUser) {
                    res.status(http_status_codes_1.OK).json();
                }
                else {
                    res.status(http_status_codes_1.BAD_REQUEST).json("error, the operation is not successful");
                }
                return [3 /*break*/, 5];
            case 4:
                res.status(400).json("error, the operation is not successful");
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/adduserroles', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var role, addAttempt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                role = new Role_1.Role();
                role = req.body;
                return [4 /*yield*/, typeorm_1.getRepository(Role_1.Role).save(role)];
            case 1:
                addAttempt = _a.sent();
                if (addAttempt) {
                    res.status(300).json("New Role added successfully: " + JSON.stringify(addAttempt));
                }
                else {
                    res.status(400).json("error, the operaton could not be completed");
                }
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
