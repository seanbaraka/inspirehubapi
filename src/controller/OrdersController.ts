import { NextFunction, Response, Request } from "express";
import { getRepository } from "typeorm";
import { OrderDetail } from "../entity/Order";
import { NOT_FOUND, OK } from "http-status-codes";

export class OrdersController {

    async getall( req: Request, res: Response, next: NextFunction) {
        let orders = await getRepository(OrderDetail).find({ relations: ['customer']})

        if(orders == null || orders.length < 1) res.status(NOT_FOUND)

        res.status(OK).json(orders)


    }
}