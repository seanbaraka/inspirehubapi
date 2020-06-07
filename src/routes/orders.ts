import { Router } from "express";
import { OrdersController } from "../controller/OrdersController";

const router = Router()

router.get('/', OrdersController.prototype.getall)

router.get('/customer/:id', OrdersController.prototype.getCustomerOrders)

router.get('/invoices', OrdersController.prototype.getInvoices);

router.get('/unpaid', OrdersController.prototype.getUnpaidInvoices)

router.get('/products/top', OrdersController.prototype.mostOrderedProduct)
module.exports = router;
