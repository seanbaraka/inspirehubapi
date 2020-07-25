import { NextFunction, Response, Request } from "express";
import { getRepository } from "typeorm";
import { OrderDetail } from "../entity/OrderDetail";
import { NOT_FOUND, OK } from "http-status-codes";
import { Customer } from "../entity/Customer";
import { User } from "../entity/User";
import * as io from "socket.io";
import {Invoice} from "../entity/Invoice";
import {Product} from "../entity/Product";
import { Transaction } from "../entity/Transaction";
import { Statement } from "../entity/Statement";

export class OrdersController {

    async getall( req: any, res: Response, next: NextFunction) {
        let orders = await getRepository(OrderDetail).find({ relations: ['products','customer', 'customer.user']})

        if(orders === null || orders.length < 1) res.status(NOT_FOUND)

        res.status(OK).json(orders)

    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        let order = await getRepository(OrderDetail).findOne({
            where: {
                id: req.params.id
            },
            relations: ['products','customer', 'customer.user','invoices']
        })

        if (order === null ) res.status(NOT_FOUND).end()

        res.status(OK).json(order)
    }


    async getCustomerOrders( req: Request, res: Response, next: NextFunction) {
        let customer = await getRepository(Customer).findOne({ where: {
            cust_id: req.params.id
        }, relations: ['user']})

        if(customer === null) res.status(NOT_FOUND)

        let orders = await getRepository(OrderDetail).find({ where: {
            customer: customer
        }, relations: ['products']})
        
        if(orders === null || orders.length < 0) res.status(NOT_FOUND).end()

        res.status(OK).json(orders)

    }

    async getCustomerInvoices(req: Request, res: Response, next: NextFunction) {
        let customer = await getRepository(Customer).findOne({ where: {
            cust_id: req.params.id
            }})
        if (customer === null) res.status(NOT_FOUND).end()

        let allInvoices = await getRepository(Invoice).find({
            relations: ['order', 'order.customer']
        })

        res.json(allInvoices.filter(x => x.order.customer.cust_id === customer.cust_id))

    }

    async getOrderInvoices(req: Request, res: Response, next: NextFunction) {
        let order = await getRepository(OrderDetail).findOne({
            where: {
                id: req.params.id
            }
        })

        res.status(OK).json(order.invoices)

    }

    async getInvoices(req: any, res: Response, next: NextFunction) {
        let invoices = await getRepository(Invoice).find({relations: ['order','order.products','order.customer','order.customer.user']})
        if(invoices === null || invoices.length <= 0) res.status(NOT_FOUND).json({error: 'There are no invoices at the moment'})
        let io: io.Socket = req.io

        io.emit("updateInvoices", invoices);

        res.status(OK).json(invoices);
    }

    async getUnpaidInvoices(req, res:Response, next: NextFunction) {
        let invoices = await getRepository(Invoice).find({ relations: ['order', 'order.products', 'order.customer', 'order.customer.user'], where: {
            status: 0 || 2
            }})

        if(invoices.length <= 0) res.status(NOT_FOUND).json({error: NOT_FOUND})

        const balaces = invoices.map(i => i.balance)
        const totalBalance = balaces.reduce((a,b) => a + b, 0)

        let io: io.Socket = req.io;
        io.emit('updateUnpaidInvoices', invoices);

        const unclearedInvoices = {
            'count': invoices.length,
            'amount': totalBalance,
            'invoices': invoices
        }

        res.status(OK).json(unclearedInvoices)

    }

    async mostOrderedProduct(req,res,next) {
        let orders = await getRepository(OrderDetail).find(
            { relations: ['products','products.category','products.orders',
                    'products.orders.customer',"products.orders.customer.user"]})
        let products: Product[];

        function getProducts(orders: OrderDetail[]): Product[] {
            let products = []
            orders.forEach((item) => {
               products.push(...item.products)
            })
            return products;
        }

        products = getProducts(orders)

        let mostOrderedProduct = products.sort((a,b) =>
            products.filter(item => item.id === a.id).length
            - products.filter(item => item.id == b.id).length
        ).pop()

        res.status(OK).json(mostOrderedProduct)
    }

    async createInvoice(order: OrderDetail, dateDue: number): Promise<Boolean>{
        let inv = new Invoice()
        inv.order = order

        let month = new Date().getMonth()
        let date = new Date().getDate()
        let seconds = new Date().getSeconds()

        inv.number = `INV${date}${month}${seconds}`

        let now = new Date(Date.now())
        let dueDate = now.setDate(now.getDate() + dateDue)

        inv.duedate = new Date(dueDate)

        let createInvoiceAttempt = await getRepository(Invoice).save(inv);

        if(!createInvoiceAttempt) return false ;
        return true;

    }

    async payInvoice(req: Request, res: Response, next: NextFunction) {

        const paymentObj = req.body // Capture the payment object from the client
        

       
        let paymentRequest = new Transaction() // initialize a new transaction

         // Transaction properties here, setting amount and mode of payment
         if(paymentObj.mode === 'cash') {
            paymentRequest.refNumber = `${paymentObj.mode}20${paymentObj.number}`
         } else {
            paymentRequest.refNumber = `${paymentObj.mode}- ${paymentObj.transactionCode.toUpperCase()}`
         }
         paymentRequest.amountPaid = paymentObj.amount
         paymentRequest.modeOfPayment = paymentObj.mode

        // get the invoice associated with the invoice number passed with the payment details
        const invoice = await getRepository(Invoice).findOne({
            where: {
                number : paymentObj.number
            },
            relations: ['order','order.customer']
        })

        // TODO: Implement a situation where the invoice is not found.
        // DO NOT FORGET !!

        paymentRequest.invoice = invoice // associate the transaction with the invoice obtained above

        const addPayment = await getRepository(Transaction).save(paymentRequest) // save the payment transaction and get the saved instance

        const transactionsWithInvoice = await getRepository(Transaction).find({
            where: {
                invoice: invoice
            }
        })


        // get the payments made for the particular invoice
        let payments: number[] = []; // initialize an payment
        transactionsWithInvoice.forEach((invoice) => {
            payments.push(invoice.amountPaid)
                
        })

        const totalPayments = payments.reduce((a,b) => a + b, 0)
                
        
        let balance = invoice.order.amount - totalPayments // get the balance from the invoice.
        
        invoice.balance = balance // deduct the amount passed from the invoice balance
        
        if (invoice.balance == 0) {
            invoice.status = 1
        } else if (invoice.balance > 0 && invoice.balance < invoice.order.amount) {
            invoice.status = 2
        } else {
            invoice.status = 0
        }

        const updatedInvoice = await getRepository(Invoice).save(invoice) // Update the invoice at the database

        // create a new customer statement and add the properties
        let custStatement = new Statement()
        const customer = updatedInvoice.order.customer
        
        custStatement.customer = customer
        custStatement.refNumber = updatedInvoice.number.toString()
        custStatement.credit = Number.parseInt(paymentObj.amount)
        custStatement.description = `Payment - ${addPayment.refNumber}`
        custStatement.balance = updatedInvoice.balance
        
        await getRepository(Statement).save(custStatement) // save the statement

        console.log(new Date().valueOf());
        

        res.status(OK).json(addPayment)
        
    }


    // Get all transactions made
    async getPayments(req: Request, res: Response, next: NextFunction){
        
        const transactionsRepo = getRepository(Transaction);
        const transactionsCount = (await transactionsRepo.find()).length
        const allTransactions =  await transactionsRepo.find()
        let amount = allTransactions.map(a => a.amountPaid)

        const paymentsTotal = amount.reduce((a,b) => a + b, 0)
        
        // transactions summary object, contains the count, total and the actualy transaction objects
        const transactions = {
            'count': transactionsCount,
            'total': paymentsTotal,
            'transactions': allTransactions
        }

        res.status(OK).json(transactions)

    }


}
