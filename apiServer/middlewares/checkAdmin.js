import jwt from "jsonwebtoken"
import { loginUserModel } from "../models/loginModel.js"

async function checkAdmin(req, res, next) {
  try {
    let { token } = req.headers

    if (!token) throw ("not a valid token !")

    let decode = jwt.verify(token, process.env.JWT_SECRET)

    let validUser = await loginUserModel.findOne({ "email": decode.email })

    if (!validUser) {
      throw ("not a valid user !")
    }

    req.user = validUser

    next()
  } catch (err) {
    console.log("error from checkAdmin middleware : ", err)
    res.status(401).json({ message: "failed to execute process !", err })
  }
}

export { checkAdmin }