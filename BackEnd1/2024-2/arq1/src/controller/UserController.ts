// Onde vou colocar comunicação
import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness';


export class UserController {
    userBusiness = new UserBusiness()
    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const token = this.userBusiness.login(email, password);
            res.send(token);
        } catch (error: any) {
            res.send(error.sqlMessage || error.message);
        }
    }
    signup = async (req: Request, res: Response) => {
        try {
            const { email, password, name, nickname, role } = req.body;
            const token = this.userBusiness.signup(email, password, name, nickname, role);
            res.send(token);
        } catch (error: any) {
            res.send(error.sqlMessage || error.message);
        }
    }
}