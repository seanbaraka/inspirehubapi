import { getRepository, getTreeRepository } from "typeorm";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { OK, BAD_REQUEST, NOT_FOUND, NOT_MODIFIED, CREATED, UNAUTHORIZED } from "http-status-codes"
import { NOTFOUND } from "dns";
import { Customer } from "../entity/Customer";
import { OrderDetail } from "../entity/Order";

import { randomBytes, pbkdf2Sync } from "crypto";

export class UserController {


    private userRepository = getRepository(User);
    salt = randomBytes(16).toString('hex')

    async all(request: Request, response: Response, next: NextFunction) {
       let users = await getRepository(User).find({ relations: ['role'] })
       if(!users) response.status(BAD_REQUEST).json(`Errror Code: ${BAD_REQUEST}`)

       response.status(OK).json(users)
    }

    async one(request: Request, response: Response, next: NextFunction) {
        let user = await getRepository(User).find({ where: {id: request.params.id}, relations: ['role']})

        if(!user ) response.status(NOT_FOUND).json({ error_code: NOTFOUND})
        
        response.status(OK).json({ user: user })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    setPassword(password: string ,salt: string) {
        return pbkdf2Sync(password,salt,1000,64, 'sha512').toString('hex')
    }


    async login(req: Request, res: Response, next: NextFunction) {
        
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

    async register(req: Request, res: Response, next: NextFunction) {
        let user = new User()
        user.firstName = req.body.firstname
        user.lastName = req.body.lastname
        user.salt = randomBytes(16).toString('hex')

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

        res.status(CREATED).json({ customer: customerAdd.user})

    }

}