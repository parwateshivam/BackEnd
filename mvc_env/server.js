import express from "express"
import { urlencoded } from "express"
import dotenv from "dotenv"
import route from "./Routes/routes.js"
import ejs from "ejs"

dotenv.config({ path: "./config.env" })

const app = express()

let port = process.env.PORT

app.use(express.urlencoded({ extended: true }))

app.use(express.static("Public"))

app.set("view engine", "ejs")

app.use(route)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})