import express from "express";
import adminController from "./controller/admin.controller";
const routerAdmin = express.Router();



// ADMIN
routerAdmin.get("/", adminController.goHome);

routerAdmin.get("/login", adminController.getLogin)


routerAdmin.get("/signup", adminController.getSignup)



export default routerAdmin
