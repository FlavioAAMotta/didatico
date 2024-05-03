import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export const userRouter = express.Router();
const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenGenerator(),
    new HashGenerator()
);
const userController = new UserController(userBusiness);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
