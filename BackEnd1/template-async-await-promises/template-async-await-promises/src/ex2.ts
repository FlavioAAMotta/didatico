import axios from "axios"
import { baseURL } from "./baseURL"

axios.get(`${baseURL}/subscriber/idInvalido/notifications`)
    .then(res => console.log(res.data))
    .catch(error => error.response?.data || error.message) //Null safety
    .then(console.log)
