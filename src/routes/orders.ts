import { Router } from "express";
import { OrdersController } from "../controller/OrdersController";

const router = Router()

router.get('/', OrdersController.prototype.getall);

router.get('/:id', OrdersController.prototype.getOne);

router.get('/customer/:id', OrdersController.prototype.getCustomerOrders);

router.get('/invoices/all', OrdersController.prototype.getInvoices);

router.get('/invoices/customer/:id', OrdersController.prototype.getCustomerInvoices);

router.get('/invoices/unpaid', OrdersController.prototype.getUnpaidInvoices);

router.get('/products/top', OrdersController.prototype.mostOrderedProduct);

router.post('/payment/', OrdersController.prototype.payInvoice);

router.get('/payments/all', OrdersController.prototype.getPayments);

module.exports = router;
