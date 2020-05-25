import { Router } from "express";
import { OrdersController } from "../controller/OrdersController";

const router = Router()

router.get('/', OrdersController.prototype.getall)

module.exports = router;