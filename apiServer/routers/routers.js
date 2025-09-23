import express from "express"
import { getDetails, getFilteredData, getAllData, getLanguageBasedOnId, postLanguage } from "../controllers/controller.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("/getdeatils")
})

router.get("/getdetails", getDetails)

router.get("/filter", getFilteredData)

router.get("/getall",getAllData)

router.get("/getlanguage/:id",getLanguageBasedOnId)

router.post("/addlanguage",postLanguage)

export { router }