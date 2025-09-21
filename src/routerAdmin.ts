import express from "express";
import adminController from "./controller/admin.controller";
const routerAdmin = express.Router();



// Restaurants
routerAdmin.get("/", adminController.goHome);

routerAdmin
.get("/login", adminController.getLogin)


routerAdmin
.get("/signup", adminController.getSignup)


routerAdmin.get("/logout", adminController.logout);

export default routerAdmin
