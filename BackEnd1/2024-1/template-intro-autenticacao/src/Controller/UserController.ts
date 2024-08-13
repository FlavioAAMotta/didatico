import { Request, Response } from "express";
import { User } from "../model/User";
import { UserBusiness } from "../Business/UserBusiness";

export class UserController {
    const userBusiness = new UserBusiness()
    const createUser = (
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const user: User = req.body;
            const token = this.userBusiness.createUser(user);
            res.status(201).send(token)
        } catch (e: any) {
            res.send(e.message);
        }
    }
}