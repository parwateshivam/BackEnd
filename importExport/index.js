import express from "express"
import data1 from "./data1.js"
let app = express();

console.log(data1);

let port = 3000;

app.listen(port,(req,res)=>{
  console.log(`http://localhost:${port}`)
})