"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductsController_1 = require("../controller/ProductsController");
var router = express_1.Router();
router.get('/', ProductsController_1.ProductsController.prototype.products);
router.get('/categories', ProductsController_1.ProductsController.prototype.categories);
router.post('/createcategory', ProductsController_1.ProductsController.prototype.createcategory);
router.post('/createproduct', ProductsController_1.ProductsController.prototype.createproduct);
module.exports = router;
//# sourceMappingURL=products.js.map