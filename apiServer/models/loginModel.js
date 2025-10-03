import mongoose from "mongoose";
import bcrypt from "bcrypt"

const loginSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registeredAt: {
    type: Object,
    require: true,
    default: Date.now
  },
  addedLanguges: {
    type: Array,
    default: []
  }
})

loginSchema.pre("save", async function () {
  try {
    this.registeredAt = "D:" + new Date().toLocaleDateString() + "T:" + new Date().toLocaleTimeString()

    let hash = await bcrypt.hash(this.password, 12)

    this.password = hash
  } catch (err) {
    console.log("error in pre save method of user schema : ", err)
  }
})

let loginUserModel = new mongoose.model("users", loginSchema)

export { loginUserModel }