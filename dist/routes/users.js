"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var router = express_1.Router();
router.get('/', UserController_1.UserController.prototype.all, function (req, res, next) {
    res.json(req.body).status(200);
});
module.exports = router;
//# sourceMappingURL=users.js.map