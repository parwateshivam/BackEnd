import express from "express"

import { handleLoginUser } from "../controllers/loginController.js"

const loginRouter = express.Router()

loginRouter.post("/login", handleLoginUser)

export { loginRouter }