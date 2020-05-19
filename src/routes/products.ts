import { Router } from "express";
import { ProductsController } from "../controller/ProductsController";

const router = Router()

router.get('/', ProductsController.prototype.products)

router.get('/categories', ProductsController.prototype.categories)

router.post('/createcategory', ProductsController.prototype.createcategory)

router.post('/createproduct', ProductsController.prototype.createproduct)


module.exports = router