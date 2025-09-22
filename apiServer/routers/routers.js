import express from "express"
import { getDetails, getFilteredData } from "../controllers/controller.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("/getdeatils")
})

router.get("/getdetails", getDetails)

router.get("/filter", getFilteredData)

export { router }