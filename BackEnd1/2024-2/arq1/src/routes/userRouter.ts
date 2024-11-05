import express from 'express'
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)
// userRouter.get('/view', userController.signup)