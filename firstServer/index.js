import express from "express"

let app = express();

app.get("/", (req, res) => {
  res.send("welcome")
})

let port = 5000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})