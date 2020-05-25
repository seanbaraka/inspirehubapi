import { Router, Request, Response, NextFunction } from "express";
import { UserController } from '../controller/UserController'
import { getConnection, getRepository } from "typeorm"
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { BAD_REQUEST, CREATED, ACCEPTED, FORBIDDEN, UNAUTHORIZED, OK } from "http-status-codes"

const router = Router()

router.get('/', UserController.prototype.all)

router.get('/:id', UserController.prototype.one);

router.post('/customer/register', UserController.prototype.register);

router.post('/login', UserController.prototype.login)

router.post('/addusertorole', async (req, res, next ) => {
    let userid = req.body.userid
    let roleid = req.body.roleid

    let user = await getRepository(User).findOne(userid)
    let role = await getRepository(Role).findOne(roleid)

    if(user != null && role != null ) {
        user.role = role
        let updateUser = await getRepository(User).save(user)
        if(updateUser) {
            res.status(OK).json()
        } else {
            res.status(BAD_REQUEST).json("error, the operation is not successful")
        }
    } else {
        res.status(400).json("error, the operation is not successful")
    }
})

router.post('/adduserroles', async(req,res,next) => {
    let role = new Role()
    role = req.body

    let addAttempt = await getRepository(Role).save(role)

    if(addAttempt) {
        res.status(300).json("New Role added successfully: "+ JSON.stringify(addAttempt))
    } else {
        res.status(400).json("error, the operaton could not be completed")
    }
})

module.exports = router;