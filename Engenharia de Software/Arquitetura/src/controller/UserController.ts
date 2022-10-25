
import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const { name, nickname, email, password, role } = req.body;
      const result = this.userBusiness.signup(
        name,
        nickname,
        email,
        password,
        role
      );
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.code).send(error.message);
    }
  };

  login = async (req: Request, res: Response) => {
    try{
      const { email, password} = req.body;
      const token = this.userBusiness.login(email, password)
      res.status(200).send(token);
    } catch (error: any) {
      res.status(error.code).send(error.message);
    }
}
