import { loginUserModel } from "../models/loginModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function handleRegister(req, res) {
  try {
    let { name, email, phone, password } = req.body

    if (!name || !email || !phone || !password) {
      throw ("missing Field")
    }

    let userExists = await loginUserModel.findOne({ $or: [{ "email": email }, { "phone": phone }] })

    if (userExists) throw ("email/phone already registred please enter a different email/phone or please head to login.")

    let newUser = new loginUserModel({ name, email, phone, password })

    await newUser.save()

    res.status(202).json({ message: `Successfully Registreded user with email ${email}` })

  } catch (err) {
    console.log('error while registering the user  : ', err)
    res.status(400).json({ message: "unable to register user", err })
  }
}

async function handleLogin(req, res) {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      throw ("missing email/password")
    }

    let user = await loginUserModel.findOne({ "email": email })

    if (!user) {
      throw ("user not found")
    }

    let validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      throw ("incorrect password")
    }

    let payload = { email: user.email }

    let token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12hr" })

    res.status(202).json({ message: "login successful !", token })
  } catch (err) {
    console.log("error while login : ", err)
    res.status(err.status || 401).json({ message: err.message || "unable to login at this moment. Please try again later !", err })
  }
}

export { handleRegister, handleLogin }