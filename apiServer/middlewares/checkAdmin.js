function checkAdmin(req, res, next) {
  try {
    let { admin } = req.headers
    if (!admin) throw ("not a valid admin !")
    next()
  } catch (err) {
    console.log("error from checkAdmin middleware : ", err)
    res.status(401).json({ message: "failed to execute process !", err })
  }
}

export { checkAdmin }