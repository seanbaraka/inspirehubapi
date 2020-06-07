import { NextFunction, Response, Request } from "express";
import { getRepository } from "typeorm";
import { OrderDetail } from "../entity/OrderDetail";
import { NOT_FOUND, OK } from "http-status-codes";
import { Customer } from "../entity/Customer";
import { User } from "../entity/User";
import * as io from "socket.io";
import {Invoice} from "../entity/Invoice";
import {Product} from "../entity/Product";
import {CommandUtils} from "typeorm/commands/CommandUtils";

export class OrdersController {

    async getall( req: any, res: Response, next: NextFunction) {
        let orders = await getRepository(OrderDetail).find({ relations: ['products','customer', 'customer.user']})

        if(orders == null || orders.length < 1) res.status(NOT_FOUND)

        res.status(OK).json(orders)

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

        res.status(OK).json({ success: orders})

    }

    async getInvoices(req, res: Response, next: NextFunction) {
        let invoices = await getRepository(Invoice).find({relations: ['order','order.products']})
        if(invoices === null || invoices.length <= 0) res.status(NOT_FOUND).json({error: 'There are no invoices at the moment'})

        let io: io.Socket = req.io

        io.emit("updateInvoices", invoices);

        res.status(OK).json(invoices);
    }

    async getUnpaidInvoices(req, res:Response, next: NextFunction) {
        let invoices = await getRepository(Invoice).find({ relations: ['order', 'order.products', 'order.customer', 'order.customer.user'], where: {
            status: 0
            }})
        if(invoices.length <= 0 || invoices === null) res.status(NOT_FOUND).json({error: NOT_FOUND})

        let io: io.Socket = req.io;
        io.emit('updateUnpaidInvoices', invoices);

        res.status(OK).json(invoices)

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

}
