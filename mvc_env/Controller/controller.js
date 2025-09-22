let employeeData = [
  { name: "shivam", age: 20, salary: 20000 },
  { name: "shivam", age: 20, salary: 20000 },
  { name: "shivam", age: 20, salary: 20000 },
  { name: "shivam", age: 20, salary: 20000 },
  { name: "shivam", age: 20, salary: 20000 }
]

let GetHome = (req, res) => {
  try {
    // console.log(req.query.name)
    // console.log(req.query.phone)
    let { name, phone } = req.query

    if (!name || !phone) throw ("requested data was not found please send name and phone number !")

    // query parameters
    // console.log(name)
    // console.log(phone)
    
    res.status(200).json({ message: `hello ${name} !` })
  } catch (err) {
    console.log("an error occured ", err)
    res.status(400).json({ message: err })
  }
}

// let GetHome = (req, res) => {
//   res.render("index",{employeeData:employeeData})
// }

let GetAbout = (req, res) => {
  res.render("about")
}

let PostFormData = (req, res) => {
  console.log(req.body)
  res.status(301).redirect("/");
}

let GetSomeWhere = (req, res) => {
  try {
    console.log(req.params)
    let { name, phone } = req.params
    if (!name || !phone) {
      throw ("requested data not found please send the name and phone");
    }
    res.status(200).json({ message: `this is somewhere ! ${name}` })
  } catch (err) {
    console.log("an error occured ", err)
    res.status(400).json({ message: err })
  }
}

export { GetHome, GetAbout, PostFormData, GetSomeWhere }