import {NextFunction, Request, Response} from "express";
import {getRepository} from "typeorm";
import {Quotation} from "../entity/Quotation";
import {NOT_FOUND, NOT_MODIFIED, OK} from "http-status-codes";
import {Customer} from "../entity/Customer";
import {Product} from "../entity/Product";
import * as io from 'socket.io';
import SocketIO = require("socket.io");

export class QuotationsController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        let quotes = await getRepository(Quotation).find({
            relations: ['products','customer','customer.user']
        })
        
        if(quotes.length < 1) res.status(NOT_FOUND).json([])
        
        res.status(OK).json(quotes)
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        let quotation = await getRepository(Quotation).findOne(req.params.id, {
            relations: ['products','customer','customer.user']
        });
        if(!quotation) res.status(NOT_FOUND).end()

        res.status(OK).json(quotation)
    }

    async createQuote(req: any, res: Response, next: NextFunction) {
        let quoteRequest = req.body

        let customer = await getRepository(Customer).findOne({
            where: {
                cust_id: quoteRequest.customerId
            }
        })

        if(!customer) res.status(NOT_MODIFIED).end()

        let productIdsArray: number[] = quoteRequest.products
        let productsFromArray: Product[] = [];
        let quoteAmount: number = 0;
        for (const id of productIdsArray) {
            let product = await getRepository(Product).findOne(id)
            productsFromArray.push(product);
            quoteAmount += product.price;
        }
        if(!productsFromArray.length) res.status(NOT_MODIFIED).end()

        let quoteObj: Quotation = quoteRequest
        let day = new Date(Date.now()).getDate()
        let second = new Date(Date.now()).getSeconds()
        let milisecond = new Date(Date.now()).getMilliseconds();

        quoteObj.number = `QT${milisecond}${second}${day}`;
        quoteObj.products = productsFromArray;
        quoteObj.customer = customer
        quoteObj.amount = quoteAmount


        let addAttempt = await getRepository(Quotation).save(quoteObj)

        if(!addAttempt) res.status(NOT_MODIFIED).json({ error: 'an error' +
                ' occured'});

        let io: io.Socket = req.io
        const quotes = await getRepository(Quotation).find({
            relations: ['products','customer','customer.user']
        })
        io.emit('updateQuotes', quotes)
        res.status(OK).json(addAttempt);

    }

    async removeQuote(req: any, res: Response) {
        const quoteId = req.params.id
        const quoteToRemove = await getRepository(Quotation).findOne(quoteId)
        const removeAttempt = await getRepository(Quotation).remove(quoteToRemove)
        if(!removeAttempt) res.status(NOT_MODIFIED).end()

        const io: SocketIO.Socket = req.io
        io.emit('updateQuotes', await getRepository(Quotation).find({ relations: ['products','customer','customer.user']}))
        res.status(OK).json(removeAttempt)
    }
}
