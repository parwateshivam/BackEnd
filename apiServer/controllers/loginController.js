import { loginUserModel } from "../models/loginModel.js"

async function handleLoginUser(req, res) {
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

export { handleLoginUser }