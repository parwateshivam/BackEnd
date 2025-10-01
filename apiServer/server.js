import express from "express"
import dotenv from "dotenv"
import { router } from "./routers/routers.js"
import connectDB from "./database/connection.js"

dotenv.config({ path: "./config.env" })

connectDB()

const app = express()

let port = process.env.PORT

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use("/languages/api", router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

