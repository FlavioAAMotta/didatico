import { app } from "./app";
import { createTask } from "./endpoints/createTask";
import { getTaskById } from "./endpoints/getTaskById";
import { UserController } from "./controller/userController";
import { UserData } from "./data/userData";
import { UserBusiness } from "./business/userBusiness";

const userData = new UserData();
const userBusiness = new UserBusiness(userData);
const userController = new UserController(userBusiness);

app.post("/user/signup", userController.signup);
app.post("/user/login", userController.login);

app.put("/task", createTask);
app.get("/task/:id", getTaskById);

//POST localhost:3003/user/login
