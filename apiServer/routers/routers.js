import express from "express"
import { getDetails, getFilteredData, getAllData, postLanguage } from "../controllers/controller.js"
import { checkAdmin } from "../middlewares/checkAdmin.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("/getdeatils")
})

router.get("/getdetails", getDetails)

router.get("/filter", getFilteredData)

router.get("/getall", getAllData)

router.post("/addlanguage", checkAdmin, postLanguage)

export { router }