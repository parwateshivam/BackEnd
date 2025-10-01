import { json } from "express";
import { languageModel } from "../models/userModel.js";

let languages = []

async function getLanguageData() {
  try {
    languages = await languageModel.find({})
  } catch (err) {
    console.log(err)
  }
}

getLanguageData();

function getDetails(req, res) {
  res.status(200).json({
    message: "welcome to our language api where you can search or query based on scope, duration(in weeks), and difficulty level(easy,medium,hard) and also you can search for partucilar language based on id[1 to 50]",
    routes: [
      {
        method: "GET",
        address: "localhost/languages/api/filter?scope=value",
        expectedResult: "Array/Null",
        queryOptions: [
          "scope", "duration[in weeks]", "diffuculties"
        ],
        possibleScopes: [
          "Web development", "Full-stack", "Mobile apps", "AI", "ML", "Data science", "Scripting", "Enterprise apps", "Android", "Backend systems", "System programming", "Embedded systems", "OS", "Game dev", "High-performance apps",
          "System software", "Desktop apps", "CMS (WordPress, Drupal)", "Cloud", "Distributed systems", "Web assembly", "Blockchain", "Modern JVM apps", "iOS",
          "macOS apps", "Scalable web apps", "Angular", "React apps", "Databases", "Queries", "Data analysis", "Statistics", "Visualization", "Big data", "Functional programming", "Text processing", "Legacy iOS apps", "Engineering", "Simulation", "Scientific computing",
          "Research", "Compilers", "Automation", "Linux administration", "Windows automation", "DevOps",
          "Real-time systems", "Telecom", "Simulations", "Banking", "Finance", "JVM ecosystem",
          ".NET ecosystem", "Low-level programming", "Smart contracts (Ethereum)", "Hardware design",
          "FPGA programming", "Digital circuits", "Logic programming", "Military", "Avionics", "OOP",
          "Cross-platform development", "Fast scripting", "Facebook’s HHVM ecosystem", "SAP systems",
          "Quantum computing", "Math-heavy programming", "Legacy systems", "Educational programming",
          "Basics", "Beginner education", "Kids programming"
        ]
      },
      {
        method: "GET",
        address: "localhost/languages/api/getall",
        expectedResult: "JSON object",
      },
      {
        method: "GET",
        address: "localhost/languages/api/getdetails",
        expectedResult: "JSON object",
      },
      {
        method: "GET",
        address: "localhost/languages/api/getlanguage/:id",
        expectedResult: "JSON object",
      }
    ]
  })
}

function getFilteredData(req, res) {
  try {
    let { scope, duration, difficulty } = req.query

    let userScope = scope;
    let userDuration = duration;
    let userDifficulty = difficulty;

    if (!scope && !duration && !difficulty) {
      throw ("filter is invalid !")
    }

    let filteredArray = []

    let queryType = ""

    if (scope) {
      filteredArray = languages.filter((object) => {
        return object.scope.some((element) => element.toLowerCase() == userScope.toLowerCase().trim())
      })
      queryType += "/scope"
    }

    if (duration) {
      filteredArray = languages.filter((object) => {
        return Number(object.duration) <= Number(userDuration)
      })
      queryType += "/duration"
    }

    if (difficulty) {
      filteredArray = languages.filter((object) => {
        return object.difficulties.toLocaleLowerCase() == userDifficulty.toLocaleLowerCase()
      })
      queryType += "/difficulty"
    }

    if (filteredArray.length == 0) throw (`unable to find languages based on ${queryType}`)

    res.status(200).json({ message: `got result based on ${queryType}`, resultCount: filteredArray.length, results: filteredArray })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "unable to get data based on filter !", err, possibleFilters: ["?scope", "?duration", "?difficulties"] })
  }
}

const getAllData = (req, res) => {
  res.status(200).json({ languages })
}

const postLanguage = async (req, res) => {
  try {
    let { title, scope, duration, difficulties } = req.body

    if (!title || !scope || !duration || !difficulties) {
      throw ("invalid/incompete data")
    }

    if (!Array.isArray(scope)) {
      throw ("invalid data scope has to be an array")
    }

    let newLanguage = new languageModel({
      title, scope, duration, difficulties
    })

    await newLanguage.save()

    res.status(202).json({ message: `new language added successfully !` })

    getLanguageData()
  } catch (err) {
    console.log('err while adding a new language !', err)
    res.status(400).json({ message: `unable to new language !`, err })
  }
}

export { getDetails, getFilteredData, getAllData, postLanguage }