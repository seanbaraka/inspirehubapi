import { getRepository, getTreeRepository } from "typeorm";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { OK, BAD_REQUEST, NOT_FOUND, NOT_MODIFIED, CREATED, UNAUTHORIZED } from "http-status-codes"
import { NOTFOUND } from "dns";
import { Customer } from "../entity/Customer";
import { OrderDetail } from "../entity/OrderDetail";

import { randomBytes, pbkdf2Sync, createCipher, pbkdf2 } from "crypto";
import * as io from "socket.io";
import {Invoice} from "../entity/Invoice";
import {error} from "util";
import SocketIO = require("socket.io");



export class UserController {

    private userRepository = getRepository(User);

    async all(req: Request, response: Response, next: NextFunction) {
       let users = await getRepository(User).find({ relations: ['role'] })
       if(!users) response.status(BAD_REQUEST).json(`Errror Code: ${BAD_REQUEST}`)

       response.status(OK).json(users)
    }

    async customers(req: Request, response: Response, next: NextFunction) {
        let customers = await getRepository(Customer).find({ relations: ['user','orders']})
        if(customers === null || customers.length  <=0 ) response.status(NOT_FOUND).end()


        response.status(OK).json(customers);
    }

    async oneCustomer(req: Request, response: Response, next: NextFunction) {
        let customer = await getRepository(Customer).findOne(req.params.id, { relations: ['user']})

        if(!customer) response.status(NOT_FOUND).end()

        response.status(OK).json(customer)
    }

    // async getCustomerId(req: Request, res: Response) {
    //     let customer = await getRepository(User).findOne({
    //         where: {
    //             emailAddress: req.params.
    //         }
    //     })
    // }

    async one(request: Request, response: Response) {
        let user = await getRepository(User).findOne(request.params.id,{ relations: ['role']})

        if(user === null ) response.status(NOT_FOUND).end()
        
        response.status(OK).json({ user: user })
    }


    async remove(request: Request) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

   

    async login(req: Request, res: Response) {
        
        let user = await getRepository(User).findOne({ where: { 
            emailAddress: req.body.email
        }})

 
        if(!user) res.status(NOT_FOUND).json({error: "user not found"})

        let passwordhash = pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex')      


        if(passwordhash === user.password) {
            res.status(OK).json({ success: {
                id: user.id, email: user.emailAddress
            }})
        } else {
            res.status(UNAUTHORIZED).json({ error: "Invalid login credentials"})
        }
    }

    async roles( req: Request, res: Response, next: NextFunction) {

        let roles = await getRepository(Role).find()
        // console.log(roles)
        if(roles == null || roles.length < 1) res.status(NOT_FOUND).json({error: "User Roles not found"})

        res.status(OK).json({success: roles})
    }

    async registerCustomer(req:any, res: Response) {
        let user = new User();
        user.firstName = req.body.firstname
        user.lastName = req.body.lastname

        user.salt = randomBytes(16).toString('hex');

        user.password = pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex')

        user.emailAddress = req.body.email
        user.role =  await getRepository(Role).findOne({ where: {
                name: 'customer'
            }})

        let customer = new Customer()
        customer.address = req.body.address
        customer.telephone = req.body.phone

        customer.user = user

        await getRepository(User).save(user)
        let newCustomer = await getRepository(Customer).save(customer)

        let updatedCustomers = await getRepository(Customer).find({
            relations: ['user','orders']
        })
        let io: SocketIO.Socket = req.io
        io.emit('updateCustomers', updatedCustomers)

        res.status(OK).json(newCustomer)

    }

    async register(req: any, res: Response) {

        let user = new User()
        user.firstName = req.body.firstname
        user.lastName = req.body.lastname


        user.salt = randomBytes(16).toString('hex');

        user.password = pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex')

        user.emailAddress = req.body.email
        user.role =  await getRepository(Role).findOne({ where: {
            name: 'customer'
        }})

        let customer = new Customer()
        customer.address = req.body.address
        customer.telephone = req.body.phone

        let order = new OrderDetail()
        order.products = req.body.order

        let amount = 0 //initialize the order amount to 0

        // calculate the total order amount from the array of products selected
        order.products.forEach(element => {
            amount += element.price
        });

        let month = new Date().getMonth()
        let date = new Date().getDate()
        let seconds = new Date().getSeconds()


        order.orderNumber = `#ON${date}${month}${seconds}`
        order.amount = amount

        customer.user = user

        let registerAttempt = await getRepository(User).save(user)
        if(!registerAttempt) res.status(NOT_MODIFIED).json({error: "An error occured and the operation could not be completed"})

        customer.user = registerAttempt;
        let customerAdd = await getRepository(Customer).save(customer)

        if(!customerAdd) res.status(NOT_MODIFIED).json({ error: "An error occured and the operation could not be completed"})

        order.customer = customerAdd

        let orderAdd = await getRepository(OrderDetail).save(order)

        if(!orderAdd) res.status(NOT_MODIFIED).json({error: "An error occured and the operation could not be completed"})

        let inv = new Invoice()
        inv.order = order

        let invmonth = new Date().getMonth()
        let invdate = new Date().getDate()
        let invseconds = new Date().getSeconds()

        inv.number = `INV${invdate}${invmonth}${invseconds}`

        let now = new Date(Date.now())
        let dueDate = now.setDate(now.getDate() + 30)

        inv.duedate = new Date(dueDate)

        let createInvoiceAttempt = await getRepository(Invoice).save(inv);

        let io: io.Socket = req.io;
        let invoices = await getRepository(Invoice).find({relations: ['order']})
        let orders = await getRepository(OrderDetail).find({ relations: ['products','customer', 'customer.user']})
        let allCustomers = await getRepository(Customer).find({ relations: ['user']})


        io.emit("updateOrders", orders)
        io.emit("updateCustomers", allCustomers)
        io.emit("updateInvoices", invoices)

        res.status(CREATED).json({ customer: customerAdd.user})

    }

}
