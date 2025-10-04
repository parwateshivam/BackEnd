import express from "express"

import { handleRegister, handleLogin } from "../controllers/loginController.js"

const loginRouter = express.Router()

loginRouter.post("/register", handleRegister)

loginRouter.post("/login",handleLogin)

export { loginRouter }