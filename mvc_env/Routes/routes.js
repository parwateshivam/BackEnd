import express from "express"
import { GetHome,GetAbout,PostFormData,GetSomeWhere } from "../Controller/controller.js";

let route = express.Router();

route.get("/",GetHome);

route.get("/about",GetAbout);

route.post("/form-data",PostFormData);

route.get("/somewhere/:name/:phone",GetSomeWhere)

export default route;