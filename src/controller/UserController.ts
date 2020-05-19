import { getRepository } from "typeorm";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { OK, BAD_REQUEST, NOT_FOUND } from "http-status-codes"
import { NOTFOUND } from "dns";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
       let users = await getRepository(User).find({ relations: ['role']})
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

}