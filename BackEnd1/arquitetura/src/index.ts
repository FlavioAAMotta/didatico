import { app } from "./app"
import { signup } from './endpoints/signup'
import { createTask } from './endpoints/createTask'
import { getTaskById } from './endpoints/getTaskById'
import { login } from './endpoints/login'

app.post('/user/signup', signup)
app.post('/user/login', login)

app.put('/task', createTask)
app.get('/task/:id', getTaskById)

