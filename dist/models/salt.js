"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var Salt = /** @class */ (function () {
    function Salt() {
        this.saltvalue = crypto_1.randomBytes(16).toString('hex');
    }
    return Salt;
}());
exports.Salt = Salt;
