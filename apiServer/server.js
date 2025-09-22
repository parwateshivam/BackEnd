import express from "express"
import dotenv from "dotenv"
import { router } from "./routers/routers.js"

dotenv.config({path: "./config.env"})

const app = express()

let port = process.env.PORT

app.use("/languages/api",router)

app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})

